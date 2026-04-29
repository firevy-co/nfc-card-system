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
 * Fetch all inquiries ordered by newest first.
 */
exports.getAllInquiries = async (req, res) => {
    try {
        const snapshot = await db.collection('inquiries').orderBy('createdAt', 'desc').get();
        const inquiries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(inquiries);
    } catch (error) {
        console.error("[INQUIRY FETCH ERROR]:", error);
        res.status(500).json({ error: "Failed to fetch inquiries", details: error.message });
    }
};

/**
 * DELETE /api/inquiries/:id
 * Permanently deletes an inquiry AND all its messages subcollection.
 * Firestore does NOT auto-delete subcollections — must be done manually.
 */
exports.deleteInquiry = async (req, res) => {
    const { id } = req.params;

    try {
        // [PURGE] Stage 1: Delete all messages subcollection documents
        const messagesRef = db.collection('inquiries').doc(id).collection('messages');
        await deleteSubcollection(messagesRef);
        console.log(`[PURGE] Messages subcollection deleted for inquiry: ${id}`);

        // [PURGE] Stage 2: Delete the inquiry document itself
        await db.collection('inquiries').doc(id).delete();
        console.log(`[PURGE] Inquiry document deleted: ${id}`);

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

    const validStatuses = ['Unread', 'Processing', 'Resolved'];
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
