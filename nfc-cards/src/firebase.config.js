import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const isOffline =
    !import.meta.env.VITE_FIREBASE_API_KEY ||
    import.meta.env.VITE_FIREBASE_API_KEY === 'YOUR_API_KEY';

const firebaseConfig = {
    apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId:             import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID };

let app;
let auth;
let db;

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

try {
    app  = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db   = getFirestore(app);

    // ─── SESSION PERSISTENCE ─────────────────────────────────────────────────
    // Default to LOCAL persistence so the Firebase SDK (via IndexedDB) manages
    // the session across page reloads and browser restarts automatically.
    // Login/Signup can override this to SESSION persistence when the user
    // does NOT check "Remember Me".
    // NO data is ever manually stored in localStorage by this app.
    setPersistence(auth, browserLocalPersistence).catch((err) => {
        console.warn("[AUTH]: Could not set session persistence:", err.message);
    });
    // ─────────────────────────────────────────────────────────────────────────

} catch (error) {
    console.error("Firebase Init Error:", error);
}

export { auth, db, googleProvider, browserLocalPersistence, browserSessionPersistence, setPersistence };
export default app;