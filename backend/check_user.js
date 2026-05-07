const { db, admin } = require('./config/firebase');

async function cleanUsers() {
    console.log('Sanitizing user registry...');
    
    try {
        const snapshot = await db.collection('users').get();
        if (snapshot.empty) {
            console.log('Registry empty.');
            return;
        }
        
        let cleaned = 0;
        for (const doc of snapshot.docs) {
            const data = doc.data();
            if (data.exists !== undefined) {
                console.log(`Cleaning poisoned flag from: ${data.email || doc.id}`);
                await doc.ref.update({
                    exists: admin.firestore.FieldValue.delete()
                });
                cleaned++;
            }
        }
        console.log(`Sanitization complete. ${cleaned} nodes restored.`);
    } catch (error) {
        console.error('Sanitization Failure:', error);
    }
}

cleanUsers();
