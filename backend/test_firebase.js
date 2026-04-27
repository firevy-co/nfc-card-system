const { auth, db, isOffline } = require('./config/firebase');

async function test() {
    console.log("isOffline:", isOffline);
    if (isOffline) {
        console.log("Offline mode - cannot test real Firebase");
        return;
    }
    try {
        console.log("Fetching users from Auth...");
        const listUsersResult = await auth.listUsers(100);
        console.log("Auth users count:", listUsersResult.users.length);

        console.log("Fetching users from Firestore...");
        const snapshot = await db.collection('users').get();
        console.log("Firestore users count:", snapshot.size);
    } catch (e) {
        console.error("TEST FAILED:", e);
    }
}

test();
