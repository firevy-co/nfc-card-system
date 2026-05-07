import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/firebase.config';
import { doc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { API_BASE_URL } from './config/api';

// --- AUTH & SECURITY CONTROLLER ---
import CheckAuth from './components/Auth/CheckAuth';
import AppSkeleton from './components/layout/AppSkeleton';

// --- PERFORMANCE: DYNAMIC CODE SPLITTING (Lazy Loading) ---
const Login = lazy(() => import('./components/Auth/Login'));
const Signup = lazy(() => import('./components/Auth/Signup'));
const CompleteProfile = lazy(() => import('./components/Auth/CompleteProfile'));
const Profile = lazy(() => import('./components/Auth/Profile'));
const Templates = lazy(() => import('./components/layout/Templates'));
const Users = lazy(() => import('./components/layout/Users'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));
const TemplatePreview = lazy(() => import('./pages/admin/TemplatePreview'));
const Inquiry = lazy(() => import('./pages/admin/Inquiry'));
const Settings = lazy(() => import('./pages/admin/Settings'));
const Support = lazy(() => import('./pages/user/Support'));
const Home = lazy(() => import('./pages/user/Home'));
const UserSettings = lazy(() => import('./pages/user/Settings'));
const IdentityLinkView = lazy(() => import('./pages/user/IdentityLinkView'));

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser);
      if (!authenticatedUser) {
        setUserData(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    let unsubSnapshot = null;
    // Guard against StrictMode double-invoke: if effect cleans up before the
    // async chain resolves, we skip attaching a listener to a dead Firestore client.
    let mounted = true;

    const startListener = async () => {
      try {
        const apiUrl = API_BASE_URL;
        
        // 1. Sync identity with backend to create doc if it doesn't exist
        try {
          const res = await fetch(`${apiUrl}/api/users/sync`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName
            })
          });
          if (res.ok && mounted) {
            const data = await res.json();
            setUserData(prev => prev ? prev : { ...data, uid: user.uid });
          }
        } catch (syncErr) {
          // Backend unavailable — fall through to Firestore listener
        }

        // 2. Bail out if the effect was already cleaned up
        if (!mounted) return;

        // 3. Set up real-time listener so profile updates flow back instantly
        const userRef = doc(db, "users", user.uid);
        
        try {
          unsubSnapshot = onSnapshot(userRef, async (docSnap) => {
            if (!mounted) return;
            if (docSnap.exists()) {
              setUserData({ ...docSnap.data(), uid: user.uid });
              setLoading(false);
            } else {
              // Document doesn't exist yet, it's probably being created by Signup/Login.
              // We just wait for the next snapshot.
              console.log("Waiting for identity to be established...");
            }
          }, (error) => {
            if (mounted) {
              console.warn("Identity Sync Warning (Permissions):", error.message);
              setLoading(false);
            }
          });
        } catch (snapErr) {
          if (mounted) {
            console.warn("Firestore listener failed to start:", snapErr.message);
            setLoading(false);
          }
        }

      } catch (error) {
        if (mounted) {
          console.error("Critical Identity Listener Setup Failure:", error);
          setLoading(false);
        }
      }
    };

    startListener();
    return () => {
      mounted = false;
      if (unsubSnapshot) {
        try { unsubSnapshot(); } catch (_) { /* ignore cleanup errors */ }
      }
    };
  }, [user]);

  if (loading || (user && !userData)) {
    return (
      <ThemeProvider>
        <AppSkeleton />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Router>
        <Suspense fallback={<AppSkeleton />}>
          <Routes>
            {/* --- PUBLIC ACCESS --- */}
            <Route path="/url/:id" element={<IdentityLinkView />} />
            <Route
              path="/login"
              element={
                !user ? (
                  <Login />
                ) : userData?.role === 'Admin' ? (
                  <Navigate to="/admin/analytics" />
                ) : userData?.onboarded ? (
                  <Navigate to="/user/home" />
                ) : (
                  <Navigate to="/user/complete-profile" />
                )
              }
            />
            <Route
              path="/signup"
              element={
                !user ? (
                  <Signup />
                ) : userData?.role === 'Admin' ? (
                  <Navigate to="/admin/analytics" />
                ) : userData?.onboarded ? (
                  <Navigate to="/user/home" />
                ) : (
                  <Navigate to="/user/complete-profile" />
                )
              }
            />

            {/* --- ADMIN PIPELINE --- */}
            <Route path="/admin/analytics" element={<CheckAuth user={user} userData={userData} loading={loading} adminOnly={true}><Analytics /></CheckAuth>} />
            <Route path="/admin/complete-profile" element={<CheckAuth user={user} userData={userData} loading={loading} adminOnly={true}><CompleteProfile /></CheckAuth>} />
            <Route path="/admin/profile" element={<CheckAuth user={user} userData={userData} loading={loading} adminOnly={true}><Profile onUserDataChange={setUserData} /></CheckAuth>} />
            <Route path="/admin/users" element={<CheckAuth user={user} userData={userData} loading={loading} adminOnly={true}><Users /></CheckAuth>} />
            <Route path="/admin/templates" element={<CheckAuth user={user} userData={userData} loading={loading} adminOnly={true}><Templates /></CheckAuth>} />
            <Route path="/admin/inquiry" element={<CheckAuth user={user} userData={userData} loading={loading} adminOnly={true}><Inquiry /></CheckAuth>} />
            <Route path="/admin/settings" element={<CheckAuth user={user} userData={userData} loading={loading} adminOnly={true}><Settings userData={userData} /></CheckAuth>} />
            <Route path="/admin/templates/:id" element={<CheckAuth user={user} userData={userData} loading={loading} adminOnly={true}><TemplatePreview userData={userData} /></CheckAuth>} />

            {/* --- USER PIPELINE --- */}
            <Route path="/user/home" element={<CheckAuth user={user} userData={userData} loading={loading}><Home /></CheckAuth>} />
            <Route path="/user/templates" element={<CheckAuth user={user} userData={userData} loading={loading}><Templates /></CheckAuth>} />
            <Route path="/user/support" element={<CheckAuth user={user} userData={userData} loading={loading}><Support userData={userData} /></CheckAuth>} />
            <Route path="/user/profile" element={<CheckAuth user={user} userData={userData} loading={loading}><Profile userData={userData} onUserDataChange={setUserData} /></CheckAuth>} />
            <Route path="/user/templates/:id" element={<CheckAuth user={user} userData={userData} loading={loading}><TemplatePreview userData={userData} /></CheckAuth>} />
            <Route path="/user/complete-profile" element={<CheckAuth user={user} userData={userData} loading={loading}><CompleteProfile /></CheckAuth>} />
            <Route path="/user/settings" element={<CheckAuth user={user} userData={userData} loading={loading}><UserSettings userData={userData} /></CheckAuth>} />

            {/* --- GLOBAL SYNC & FALLBACK --- */}
            <Route
              path="/"
              element={
                user ? (
                  (() => {
                    const hasData = userData?.onboarded || userData?.phone || userData?.company || userData?.job || userData?.name;
                    if (hasData) {
                      return userData?.role === 'Admin' ? <Navigate to="/admin/analytics" /> : <Navigate to="/user/home" />;
                    } else {
                      return <Navigate to="/user/complete-profile" />;
                    }
                  })()
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;

