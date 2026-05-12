const { db } = require('../config/firebase');

/**
 * HELPER: Recursively batch-delete all docs in a Firestore subcollection.
 */
const deleteSubcollection = async (collectionRef, batchSize = 100) => {
    const snapshot = await collectionRef.limit(batchSize).get();
    if (snapshot.empty) return;
    const batch = db.batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    if (snapshot.size === batchSize) {
        await deleteSubcollection(collectionRef, batchSize);
    }
};

/**
 * GET /api/inquiries
 * Fetch inquiries. Supports optional ?uid filter for users.
 */
exports.getAllInquiries = async (req, res) => {
    const { uid } = req.query;
    try {
        let queryRef = db.collection('inquiries');
        
        if (uid) {
            queryRef = queryRef.where('uid', '==', uid);
        }

        // Always fetch all and sort in memory if needed, or use a complex query if indexes are ready.
        // For simplicity and reliability in this environment, we'll fetch and sort.
        const snapshot = await queryRef.get();
        let inquiries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        inquiries.sort((a, b) => {
            const timeA = new Date(a.lastUpdated || a.createdAt).getTime() || 0;
            const timeB = new Date(b.lastUpdated || b.createdAt).getTime() || 0;
            return timeB - timeA;
        });

        res.json(inquiries);
    } catch (error) {
        console.error("[INQUIRY FETCH ERROR]:", error);
        res.status(500).json({ error: "Failed to fetch inquiries", details: error.message });
    }
};

/**
 * GET /api/inquiries/:id/messages
 * Fetch the message thread for a specific inquiry.
 */
exports.getInquiryMessages = async (req, res) => {
    const { id } = req.params;
    try {
        const snapshot = await db.collection('inquiries').doc(id).collection('messages').orderBy('createdAt', 'asc').get();
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(messages);
    } catch (error) {
        console.error("[MESSAGES FETCH ERROR]:", error);
        res.status(500).json({ error: "Failed to fetch messages", details: error.message });
    }
};

/**
 * POST /api/inquiries/:id/messages
 * Add a message to an inquiry thread.
 */
exports.createMessage = async (req, res) => {
    const { id } = req.params;
    const { text, sender, senderName } = req.body;

    if (!text || !sender) {
        return res.status(400).json({ error: "Text and sender are required." });
    }

    try {
        const newMessage = {
            text,
            sender,
            senderName: senderName || sender,
            createdAt: new Date().toISOString()
        };

        const docRef = await db.collection('inquiries').doc(id).collection('messages').add(newMessage);
        
        // Update the main inquiry doc for status, sorting, and unread flags
        const updateData = {
            lastUpdated: new Date().toISOString(),
            lastMessage: text
        };

        if (sender === 'User') {
            updateData.status = 'Processing';
            updateData.adminUnread = true;
            updateData.userUnread = false;
        } else {
            updateData.status = 'Replied';
            updateData.userUnread = true;
            updateData.adminUnread = false;
        }

        await db.collection('inquiries').doc(id).update(updateData);

        res.status(201).json({
            success: true,
            id: docRef.id,
            message: "Message dispatched."
        });
    } catch (error) {
        console.error("[MESSAGE CREATE ERROR]:", error);
        res.status(500).json({ error: "Failed to dispatch message", details: error.message });
    }
};

/**
 * DELETE /api/inquiries/:id
 * Permanently deletes an inquiry AND all its messages subcollection.
 */
exports.deleteInquiry = async (req, res) => {
    const { id } = req.params;

    try {
        const messagesRef = db.collection('inquiries').doc(id).collection('messages');
        await deleteSubcollection(messagesRef);
        await db.collection('inquiries').doc(id).delete();

        res.json({
            success: true,
            message: `Inquiry ${id} and all associated messages permanently purged.`
        });
    } catch (error) {
        console.error("[INQUIRY DELETE ERROR]:", error);
        res.status(500).json({ error: "Failed to delete inquiry", details: error.message });
    }
};

/**
 * PATCH /api/inquiries/:id/status
 * Update the status of an inquiry.
 */
exports.updateInquiryStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Unread', 'Processing', 'Replied', 'Resolved'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    try {
        await db.collection('inquiries').doc(id).update({
            status,
            lastUpdated: new Date().toISOString()
        });
        res.json({ success: true, message: `Inquiry ${id} status updated to ${status}.` });
    } catch (error) {
        console.error("[INQUIRY STATUS ERROR]:", error);
        res.status(500).json({ error: "Failed to update inquiry status", details: error.message });
    }
};

/**
 * PATCH /api/inquiries/:id/read
 * Mark an inquiry as read for admin or user.
 */
exports.markAsRead = async (req, res) => {
    const { id } = req.params;
    const { isAdmin } = req.body;

    try {
        const updateData = {};
        if (isAdmin) {
            updateData.adminUnread = false;
        } else {
            updateData.userUnread = false;
        }

        await db.collection('inquiries').doc(id).update(updateData);
        res.json({ success: true, message: "Marked as read." });
    } catch (error) {
        console.error("[INQUIRY READ ERROR]:", error);
        res.status(500).json({ error: "Failed to mark as read", details: error.message });
    }
};

/**
 * POST /api/inquiries
 * Create a new inquiry or append to an existing one for the same user.
 */
exports.createInquiry = async (req, res) => {
    const { name, email, brief, vector, uid } = req.body;

    if (!name || !email || !brief || !uid) {
        return res.status(400).json({ error: "Name, email, brief, and uid are required." });
    }

    try {
        // Check if an inquiry already exists for this user
        const existingInquiries = await db.collection('inquiries').where('uid', '==', uid).limit(1).get();

        if (!existingInquiries.empty) {
            // Add message to existing inquiry thread
            const existingDoc = existingInquiries.docs[0];
            const inquiryId = existingDoc.id;

            const newMessage = {
                text: brief,
                sender: "User",
                senderName: name,
                createdAt: new Date().toISOString()
            };

            await db.collection('inquiries').doc(inquiryId).collection('messages').add(newMessage);

            // Update main inquiry document
            await db.collection('inquiries').doc(inquiryId).update({
                lastUpdated: new Date().toISOString(),
                lastMessage: brief,
                status: 'Unread',
                adminUnread: true,
                userUnread: false,
                vector: vector || existingDoc.data().vector // Update vector optionally
            });

            return res.status(200).json({
                success: true,
                id: inquiryId,
                message: "Added to existing inquiry thread."
            });
        }

        // Create new inquiry if none exists
        const newInquiry = {
            name,
            email,
            brief,
            uid,
            vector: vector || 'General',
            status: 'Unread',
            adminUnread: true,
            userUnread: false,
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            lastMessage: brief
        };

        const docRef = await db.collection('inquiries').add(newInquiry);
        res.status(201).json({
            success: true,
            id: docRef.id,
            message: "Inquiry successfully submitted to the network."
        });
    } catch (error) {
        console.error("[INQUIRY CREATE ERROR]:", error);
        res.status(500).json({ error: "Failed to submit inquiry", details: error.message });
    }
};

