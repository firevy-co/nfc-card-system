const admin = require('firebase-admin');

let db = null;
let auth = null;
let isOffline = false;

try {
    const rawKey = process.env.SERVICE_ACCOUNT_KEY;
    // CRITICAL FIX: When a JSON key is pasted into Render/Railway env vars,
    // the \n inside "private_key" becomes a literal \\n (escaped). 
    // JSON.parse() will then fail with a SyntaxError, causing isOffline = true.
    // We must convert \\n back to real newlines before parsing.
    const serviceAccount = rawKey
        ? JSON.parse(rawKey.replace(/\\n/g, '\n'))
        : require('../serviceAccountKey.json');

    console.log("[FIREBASE INIT]: Attempting to initialize with Project ID:", serviceAccount.project_id);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
    });

    db = admin.firestore();
    auth = admin.auth();
    console.log("[IDENTITY SYSTEM]: CLOUD INFRASTRUCTURE SYNCHRONISED SUCCESSFULLY.");
} catch (error) {
    console.error("[FIREBASE INIT ERROR]:", error.message);
    if (error.stack) console.error(error.stack);
    console.warn("[WARNING]: Firebase Service Account Key Missing or Invalid.");
    console.warn("Operating in MOCK/STANDBY MODE until ./serviceAccountKey.json is provided.");
    isOffline = true;
}

module.exports = { admin, db, auth, isOffline };
