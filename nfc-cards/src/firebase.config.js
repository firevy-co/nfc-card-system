import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const isOffline = !import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY === 'YOUR_API_KEY';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

let app;
let auth;
let db;

try {
    if (isOffline) {
        console.warn("[IDENTITY SYSTEM]: Entering STANDBY MODE (Local Mock).");
        app = { name: "[DEFAULT]", options: {} };
        // Simple mock of Firebase Auth
        auth = { 
            currentUser: null, 
            onAuthStateChanged: (cb) => {
                const stored = localStorage.getItem('mockUser');
                const user = stored ? JSON.parse(stored) : null;
                cb(user);
                return () => {};
            }, 
            signOut: async () => { 
                localStorage.removeItem('mockUser'); 
                window.location.reload(); 
            } 
        };
        // Mock Firestore
        db = {
            collection: () => ({ doc: () => ({ get: async () => ({ exists: () => true, data: () => ({ role: 'Admin', onboarded: true }) }) }) })
        };
    } else {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
    }
} catch (error) {
    console.error("Firebase Init Error:", error);
}

export { auth, db };
export default app;