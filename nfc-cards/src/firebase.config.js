import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const isOffline = !import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY === 'YOUR_API_KEY';

// Dynamically resolve authDomain:
// In production (cardyn.vercel.app), use the Vercel domain so Firebase
// doesn't throw auth/unauthorized-domain on signInWithRedirect.
// Locally (localhost), fall back to the default Firebase authDomain.
const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const isProduction = hostname !== 'localhost' && hostname !== '127.0.0.1';
const authDomain = isProduction ? hostname : import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: authDomain,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

let app;
let auth;
let db;

// GoogleAuthProvider with forced account selection for clean UX
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
} catch (error) {
    console.error("Firebase Init Error:", error);
}

export { auth, db, googleProvider };
export default app;