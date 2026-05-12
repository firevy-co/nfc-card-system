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
        
        // Strategy 1: Remove surrounding quotes
        if (cleanKey.startsWith('"') && cleanKey.endsWith('"')) {
            cleanKey = cleanKey.substring(1, cleanKey.length - 1);
        }
        
        // Strategy 4: AUTO-REPAIR - Missing curly braces (Identified via Debug Status)
        // If it starts with "type": instead of {"type":, add the brace back.
        if (!cleanKey.startsWith('{') && cleanKey.includes('"type":')) {
            console.warn("[FIREBASE INIT]: Detected missing opening brace. Repairing...");
            cleanKey = '{' + cleanKey;
        }
        if (!cleanKey.endsWith('}') && cleanKey.includes('"private_key":')) {
            console.warn("[FIREBASE INIT]: Detected missing closing brace. Repairing...");
            cleanKey = cleanKey + '}';
        }

        // Strategy 2: We NO LONGER replace \\n with \n here, because JSON.parse
        // will handle the escaped \n correctly. Doing it here creates "Bad Control Characters".
        // cleanKey = cleanKey.replace(/\\n/g, '\n');
        
        // Strategy 3: Unescape double quotes
        if (cleanKey.includes('\\"')) {
            cleanKey = cleanKey.replace(/\\"/g, '"');
        }

        try {
            serviceAccount = JSON.parse(cleanKey);
            console.log("[FIREBASE INIT]: Successfully parsed SERVICE_ACCOUNT_KEY from environment.");
        } catch (parseError) {
            // Strategy 5: DEEP CLEAN - Remove literal newlines/tabs that break JSON.parse
            // but preserve them if they are escaped as \n
            console.warn("[FIREBASE INIT]: Standard parse failed. Attempting deep-clean repair...");
            try {
                const deepCleaned = cleanKey
                    .replace(/[\n\r\t]/g, ' ') // Replace literal newlines/tabs with spaces
                    .replace(/\s+/g, ' ');      // Collapse multiple spaces
                serviceAccount = JSON.parse(deepCleaned);
                console.log("[FIREBASE INIT]: Deep-clean repair successful. Cloud sync restored.");
            } catch (deepError) {
                firebaseInitError = `JSON Parse Error: ${parseError.message}. Position: ${parseError.message.match(/position (\d+)/)?.[1] || 'unknown'}.`;
                console.error("[FIREBASE INIT]: Deep-clean also failed.");
                throw parseError;
            }
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
