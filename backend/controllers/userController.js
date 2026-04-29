const { auth, db, isOffline, admin } = require('../config/firebase');

/**
 * ARCHITECTURAL CACHE: Memory-resident identities for STANDBY MODE testing.
 */
let mockUsersCache = [
    { uid: 'abc-01', displayName: 'abc@gmail.com', email: 'abc@gmail.com', role: 'User', status: 'Standby' },
    { uid: 'hem-02', displayName: 'hemanshu@gmail.com', email: 'hemanshu@gmail.com', role: 'User', status: 'Standby' },
];

/**
 * HELPER: Batch-delete all docs in a Firestore collection/subcollection.
 */
const deleteCollection = async (collectionRef, batchSize = 100) => {
    const snapshot = await collectionRef.limit(batchSize).get();
    if (snapshot.empty) return;
    const batch = db.batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    if (snapshot.size === batchSize) {
        await deleteCollection(collectionRef, batchSize);
    }
};

/**
 * IDENTITY AUDIT: Fetching ALL network participants.
 */
exports.getAllUsers = async (req, res) => {
    try {
        if (isOffline) {
            console.warn("[SYNC]: Cloud offline. Serving memory-resident identities.");
            return res.json(mockUsersCache);
        }

        const listUsersResult = await auth.listUsers(100);
        const snapshot = await db.collection('users').get();
        console.log(`[IDENTITY AUDIT]: Found ${listUsersResult.users.length} Auth users and ${snapshot.size} Firestore profiles.`);
        
        const firestoreUsers = {};
        snapshot.forEach(doc => { firestoreUsers[doc.id] = doc.data(); });

        const users = listUsersResult.users.map(user => {
            const fsData = firestoreUsers[user.uid] || {};
            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || fsData.displayName || 'Architect',
                role: fsData.role || (fsData.isAdmin ? 'Admin' : 'User'),
                status: fsData.status || 'Active',
                lastSignIn: user.metadata.lastSignInTime
            };
        });
        res.json(users);
    } catch (error) {
        console.error("Identity Discovery Failure:", error);
        res.status(500).json({
            error: "Failed to audit network identities",
            details: error.message
        });
    }
};

/**
 * IDENTITY AUDIT: Full participant profile update (Email, Name, Role).
 */
exports.updateUserDetails = async (req, res) => {
    const { uid } = req.params;
    const { displayName, email, role } = req.body;

    try {
        if (isOffline) {
            mockUsersCache = mockUsersCache.map(u =>
                u.uid === uid ? { ...u, displayName, email, role } : u
            );
            return res.json({ message: `Identity ${uid} credentials successfully re-architected (MOCK).` });
        }

        try {
            const authPayload = {};
            if (email) authPayload.email = email;
            if (displayName !== undefined && displayName !== null) authPayload.displayName = displayName;
            if (Object.keys(authPayload).length > 0) {
                await auth.updateUser(uid, authPayload);
            }
        } catch (authError) {
            console.warn(`[IDENTITY SYNC]: Core Auth sync skipped for ${uid}: ${authError.message}`);
        }

        await db.collection('users').doc(uid).set({
            displayName: displayName || '',
            email,
            role,
            isAdmin: role === 'Admin',
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        res.json({ message: `Identity ${uid} credentials successfully re-architected.` });
    } catch (error) {
        console.error("Database Update Error:", error);
        res.status(500).json({ error: error.message });
    }
};

/**
 * DE-AUTHORIZATION: Completely purge a participant and ALL their data from the system.
 * Cascade deletes:
 *   1. Firebase Auth account
 *   2. Firestore: users/{uid}
 *   3. Firestore: companyDetails/{uid}
 *   4. Firestore: cardData/{uid}
 *   5. Firestore: nfcCards where assignedTo == uid
 */
exports.deleteUser = async (req, res) => {
    const { uid } = req.params;

    try {
        if (isOffline) {
            mockUsersCache = mockUsersCache.filter(u => u.uid !== uid);
            return res.json({ message: `Identity ${uid} purged from the network (MOCK).` });
        }

        const results = {
            auth: false,
            userDoc: false,
            companyDetails: false,
            cardData: false,
            nfcCards: 0
        };

        // [PURGE] Stage 1: Firebase Authentication Account
        try {
            await auth.deleteUser(uid);
            results.auth = true;
            console.log(`[PURGE] Auth account deleted: ${uid}`);
        } catch (authErr) {
            console.warn(`[PURGE] Auth delete skipped (may not exist): ${authErr.message}`);
        }

        // [PURGE] Stage 2: Firestore users document
        try {
            await db.collection('users').doc(uid).delete();
            results.userDoc = true;
            console.log(`[PURGE] users/${uid} deleted`);
        } catch (e) {
            console.warn(`[PURGE] users doc delete error: ${e.message}`);
        }

        // [PURGE] Stage 3: Company Details document
        try {
            await db.collection('companyDetails').doc(uid).delete();
            results.companyDetails = true;
            console.log(`[PURGE] companyDetails/${uid} deleted`);
        } catch (e) {
            console.warn(`[PURGE] companyDetails delete error: ${e.message}`);
        }

        // [PURGE] Stage 4: Card Data document
        try {
            await db.collection('cardData').doc(uid).delete();
            results.cardData = true;
            console.log(`[PURGE] cardData/${uid} deleted`);
        } catch (e) {
            console.warn(`[PURGE] cardData delete error: ${e.message}`);
        }

        // [PURGE] Stage 5: NFC Cards assigned to this user
        try {
            const nfcQuery = await db.collection('nfcCards').where('assignedTo', '==', uid).get();
            if (!nfcQuery.empty) {
                const batch = db.batch();
                nfcQuery.docs.forEach(doc => batch.delete(doc.ref));
                await batch.commit();
                results.nfcCards = nfcQuery.size;
                console.log(`[PURGE] ${nfcQuery.size} NFC card(s) unlinked for uid: ${uid}`);
            }
        } catch (e) {
            console.warn(`[PURGE] NFC cards purge error: ${e.message}`);
        }

        res.json({
            success: true,
            message: `Identity ${uid} and all associated data permanently purged.`,
            purged: results
        });
    } catch (error) {
        console.error("Purge Failure:", error);
        res.status(500).json({ error: "Failed to de-authorize participant", details: error.message });
    }
};

/**
 * CLEARANCE LEVEL: Update a participant's system authority (Admin/User).
 */
exports.updateUserRole = async (req, res) => {
    const { uid, role } = req.body;

    try {
        await db.collection('users').doc(uid).set({
            role: role,
            isAdmin: role === 'Admin',
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        res.json({ message: `Security clearance level updated to ${role} for ${uid}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * IDENTITY ONBOARDING: Commit full organization profiles to the network.
 */
exports.completeProfile = async (req, res) => {
    const { uid, ...profileData } = req.body;

    try {
        if (isOffline) {
            return res.json({
                success: true,
                message: "Company Hub successfully architected (MOCK)."
            });
        }

        await db.collection('companyDetails').doc(uid).set({
            ...profileData,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        await db.collection('users').doc(uid).set({
            ...profileData,
            onboarded: true,
            status: 'Active',
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        res.json({
            success: true,
            message: "Company Hub and Participant Node successfully architected."
        });
    } catch (error) {
        console.error("Onboarding Failure:", error);
        res.status(500).json({ error: "Failed to sync identity profile to cloud." });
    }
};
