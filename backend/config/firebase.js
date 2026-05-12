const admin = require('firebase-admin');

let db = null;
let auth = null;
let isOffline = false;
let firebaseInitError = null;

try {
    let rawKey = process.env.SERVICE_ACCOUNT_KEY;
    let serviceAccount;

    if (rawKey) {
        let cleanKey = rawKey.trim();
        
        // Strategy 1: Remove surrounding quotes if they exist (common in Render/Railway)
        if (cleanKey.startsWith('"') && cleanKey.endsWith('"')) {
            cleanKey = cleanKey.substring(1, cleanKey.length - 1);
        }
        
        // Strategy 2: Fix escaped newlines (very common)
        cleanKey = cleanKey.replace(/\\n/g, '\n');
        
        // Strategy 3: Unescape any escaped double quotes if the whole thing was stringified
        // but only if it looks like it's double-escaped
        if (cleanKey.includes('\\"')) {
            cleanKey = cleanKey.replace(/\\"/g, '"');
        }

        try {
            serviceAccount = JSON.parse(cleanKey);
            console.log("[FIREBASE INIT]: Successfully parsed SERVICE_ACCOUNT_KEY from environment.");
        } catch (parseError) {
            firebaseInitError = `JSON Parse Error: ${parseError.message}. Content starts with: ${cleanKey.substring(0, 20)}...`;
            console.error("[FIREBASE INIT]:", firebaseInitError);
            throw parseError;
        }
    } else {
        try {
            serviceAccount = require('../serviceAccountKey.json');
            console.log("[FIREBASE INIT]: Using serviceAccountKey.json file.");
        } catch (fileError) {
            firebaseInitError = "Missing SERVICE_ACCOUNT_KEY env var and serviceAccountKey.json file.";
            console.warn("[FIREBASE INIT]:", firebaseInitError);
            throw new Error("Missing credentials");
        }
    }

    console.log("[FIREBASE INIT]: Initializing Admin SDK for Project:", serviceAccount.project_id);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
    });

    db = admin.firestore();
    auth = admin.auth();
    console.log("[IDENTITY SYSTEM]: CLOUD INFRASTRUCTURE SYNCHRONISED SUCCESSFULLY.");
} catch (error) {
    if (!firebaseInitError) firebaseInitError = error.message;
    console.error("[FIREBASE INIT ERROR]:", error.message);
    isOffline = true;
    console.warn("[WARNING]: Operating in MOCK/STANDBY MODE.");
}

module.exports = { admin, db, auth, isOffline, firebaseInitError };
