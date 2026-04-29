const admin = require('firebase-admin');

let db = null;
let auth = null;
let isOffline = false;

try {
    const serviceAccount = process.env.SERVICE_ACCOUNT_KEY 
        ? JSON.parse(process.env.SERVICE_ACCOUNT_KEY) 
        : require("../serviceAccountKey.json");

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
