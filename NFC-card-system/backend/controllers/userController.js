const { auth, db, isOffline, admin } = require('../config/firebase');

/**
 * ARCHITECTURAL CACHE: Memory-resident identities for STANDBY MODE testing.
 * This ensures that updates and deletions persist until the Node.js server restarts.
 */
let mockUsersCache = [
    { uid: 'abc-01', displayName: 'abc@gmail.com', email: 'abc@gmail.com', role: 'User', status: 'Standby' },
    { uid: 'hem-02', displayName: 'hemanshu@gmail.com', email: 'hemanshu@gmail.com', role: 'Admin', status: 'Standby' },
];

/**
 * IDENTITY AUDIT: Fetching ALL network participants.
 */
exports.getAllUsers = async (req, res) => {
    // STANDBY HANDSHAKE: Serve participants from architectural cache if cloud is disconnected
    if (isOffline) {
        return res.json(mockUsersCache);
    }

    try {
        const listUsersResult = await auth.listUsers(100);
        const snapshot = await db.collection('users').get();
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
        res.status(500).json({ error: "Failed to audit network identities" });
    }
};

/**
 * IDENTITY AUDIT: Full participant profile update (Email, Name, Role).
 */
exports.updateUserDetails = async (req, res) => {
    const { uid, displayName, email, role } = req.body;
    
    // STANDBY HANDSHAKE: Persist simulated re-architecture in memory cache
    if (isOffline) {
        const index = mockUsersCache.findIndex(u => u.uid === uid);
        if (index !== -1) {
            mockUsersCache[index] = { ...mockUsersCache[index], displayName, email, role };
            return res.json({ message: "MOCK: Identity successfully re-architected in standby mode." });
        }
        return res.status(404).json({ error: "Architect Identity not found in cache" });
    }

    try {
        await auth.updateUser(uid, { email, displayName });
        await db.collection('users').doc(uid).set({ 
            displayName, email, role,
            isAdmin: role === 'Admin',
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        res.json({ message: `Identity ${uid} credentials successfully re-architected.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * DE-AUTHORIZATION: Completely purge a participant from the system.
 */
exports.deleteUser = async (req, res) => {
    const { uid } = req.params;

    // STANDBY HANDSHAKE: Persist simulated purge in memory cache
    if (isOffline) {
        mockUsersCache = mockUsersCache.filter(u => u.uid !== uid);
        return res.json({ message: "MOCK: Identity purged from standby cache." });
    }

    try {
        // [PURGE] Stage 1: Core Authentication
        await auth.deleteUser(uid);
        
        // [PURGE] Stage 2: Identity Registry
        await db.collection('users').doc(uid).delete();
        
        // [PURGE] Stage 3: Organizational Metadata
        await db.collection('companyDetails').doc(uid).delete();

        res.json({ message: `Identity ${uid} and associated business nodes purged from the network.` });
    } catch (error) {
        console.error("Purge Failure:", error);
        res.status(500).json({ error: "Failed to de-authorize participant" });
    }
};

/**
 * CLEARANCE LEVEL: Update a participant's system authority (Admin/User).
 */
exports.updateUserRole = async (req, res) => {
    // ... existing implementation ...
    const { uid, role } = req.body;
    if (isOffline) {
        const index = mockUsersCache.findIndex(u => u.uid === uid);
        if (index !== -1) {
            mockUsersCache[index].role = role;
            return res.json({ message: "MOCK: Clearance level updated in standby mode." });
        }
        return res.status(404).json({ error: "Identity not found" });
    }

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
 * Finalizes the transition from basic Auth identity to verified organization node.
 */
exports.completeProfile = async (req, res) => {
    const { uid, ...profileData } = req.body;

    if (isOffline) {
        console.log(`[STANDBY]: Profile sync intercepted for ${uid}`);
        return res.json({ message: "STANDBY: Profile synchronized to memory only." });
    }

    try {
        // [CORE STORAGE]: Store the Business Identity in a dedicated collection
        await db.collection('companyDetails').doc(uid).set({
            ...profileData,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        // [AUTH SYNC]: Unlock the participant in the main users list
        await db.collection('users').doc(uid).set({
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
