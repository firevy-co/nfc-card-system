const { db } = require('./config/firebase');
const admin = require('firebase-admin');

const fieldsToRemove = ['tiktok', 'youtube', 'zipCode', 'zipcode', 'venmo', 'paypal'];

async function cleanCollection(collectionName) {
    try {
        console.log(`Cleaning collection: ${collectionName}...`);
        const snapshot = await db.collection(collectionName).get();
        let count = 0;
        
        for (const doc of snapshot.docs) {
            const data = doc.data();
            const updates = {};
            
            for (const field of fieldsToRemove) {
                if (data[field] !== undefined) {
                    updates[field] = admin.firestore.FieldValue.delete();
                }
            }
            
            if (Object.keys(updates).length > 0) {
                await doc.ref.update(updates);
                count++;
                console.log(`Updated doc ${doc.id} in ${collectionName}`);
            }
        }
        console.log(`Finished cleaning ${collectionName}. Updated ${count} documents.`);
    } catch (e) {
        console.error(`Error cleaning ${collectionName}:`, e);
    }
}

async function run() {
    await cleanCollection('users');
    await cleanCollection('templates');
    await cleanCollection('companyDetails');
    console.log("All collections cleaned.");
    process.exit(0);
}

run();
