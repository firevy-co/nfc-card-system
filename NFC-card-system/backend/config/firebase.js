const admin = require('firebase-admin');

let db = null;
let auth = null;
let isOffline = false;

try {
    const serviceAccount = process.env.SERVICE_ACCOUNT_KEY 
        ? JSON.parse(process.env.SERVICE_ACCOUNT_KEY) 
        : require("../serviceAccountKey.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
    });

    db = admin.firestore();
    auth = admin.auth();
    console.log("\n[IDENTITY SYSTEM]: CLOUD INFRASTRUCTURE SYNCHRONISED SUCCESSFULLY.");
} catch (error) {
    console.warn("\n[WARNING]: Firebase Service Account Key Missing or Invalid.");
    console.warn("Operating in MOCK/STANDBY MODE until ./serviceAccountKey.json is provided.\n");
    isOffline = true;
}

module.exports = { admin, db, auth, isOffline };
