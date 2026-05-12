const admin = require('firebase-admin');

let db = null;
let auth = null;
let isOffline = false;

try {
    let rawKey = process.env.SERVICE_ACCOUNT_KEY;
    let serviceAccount;

    if (rawKey) {
        // CLEANUP: Render/Railway often wrap strings in extra quotes or escape newlines differently
        let cleanKey = rawKey.trim();
        
        // Remove surrounding quotes if they exist
        if (cleanKey.startsWith('"') && cleanKey.endsWith('"')) {
            cleanKey = cleanKey.substring(1, cleanKey.length - 1);
        }
        
        // Fix escaped newlines
        cleanKey = cleanKey.replace(/\\n/g, '\n');

        try {
            serviceAccount = JSON.parse(cleanKey);
            console.log("[FIREBASE INIT]: Successfully parsed SERVICE_ACCOUNT_KEY from environment.");
        } catch (parseError) {
            console.error("[FIREBASE INIT]: Failed to parse SERVICE_ACCOUNT_KEY JSON. Check for trailing commas or hidden characters.");
            throw parseError;
        }
    } else {
        try {
            serviceAccount = require('../serviceAccountKey.json');
            console.log("[FIREBASE INIT]: Using serviceAccountKey.json file.");
        } catch (fileError) {
            console.warn("[FIREBASE INIT]: No SERVICE_ACCOUNT_KEY env var and no serviceAccountKey.json file found.");
            throw new Error("Missing credentials");
        }
    }

    console.log("[FIREBASE INIT]: Initializing Admin SDK for Project:", serviceAccount.project_id);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // Note: Firestore doesn't strictly need databaseURL, but it's good for consistency
        databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
    });

    db = admin.firestore();
    auth = admin.auth();
    console.log("[IDENTITY SYSTEM]: CLOUD INFRASTRUCTURE SYNCHRONISED SUCCESSFULLY.");
} catch (error) {
    console.error("[FIREBASE INIT ERROR]:", error.message);
    isOffline = true;
    console.warn("[WARNING]: Operating in MOCK/STANDBY MODE.");
}

module.exports = { admin, db, auth, isOffline };
