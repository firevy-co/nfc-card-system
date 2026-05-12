const { db } = require('./config/firebase');

async function getUser() {
    const snapshot = await db.collection('users').where('email', '==', 'tushil3434@gmail.com').get();
    if (snapshot.empty) {
        console.log("No user found with email tushil3434@gmail.com");
    } else {
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
        });
    }
    process.exit(0);
}

getUser();
