import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/firebase.config';
import { doc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { API_BASE_URL } from './config/api';
import axios from 'axios';

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

  // --- CONFIGURATION GUARDIAN ---
  // Detect if critical Firebase environment variables are missing (common deployment error)
  const isMissingConfig = !import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY.includes('YOUR_API_KEY');

  // ── ONE-TIME LEGACY CLEANUP ──────────────────────────────────────────────
  // Wipe any real-data keys that old deployments wrote to localStorage.
  // Only the 'theme' UI preference is allowed to remain.
  useEffect(() => {
    ['onboarding_backup', 'identity_nodes'].forEach(key => {
      try { localStorage.removeItem(key); } catch (e) { console.warn(e); }
    });
  }, []);
  // ────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!auth || !db) {
      setLoading(false);
      return;
    }

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
    if (!user || !db) return;

    let mounted = true;
    let unsubSnapshot = null;

    // Safety timeout: if Firestore takes too long, stop blocking the UI
    const loadingTimeout = setTimeout(() => {
      if (mounted && loading) {
        console.warn("[APP]: Loading safety timeout reached.");
        // We do NOT set exists: false here anymore. 
        // We just stop blocking the UI and let the components handle partial data.
        setUserData(prev => prev || { uid: user.uid, error: 'timeout' });
        setLoading(false);
      }
    }, 15000); // 15 seconds safety (Render free tier can be slow)

    const initListener = async () => {
      // 1. Immediate Sync with Backend (Provides fast source of truth)
      try {
        const syncResponse = await axios.post(`${API_BASE_URL}/api/users/sync`, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        });
        
        if (mounted && syncResponse.data) {
          const syncedData = syncResponse.data;
          // Only update if we don't have better data yet
          setUserData(prev => prev || { ...syncedData, uid: user.uid });
          
          const hasOnboardingData = syncedData.onboarded || syncedData.phone || syncedData.company || syncedData.job || syncedData.businessRole || (syncedData.role === 'Admin');
          if (hasOnboardingData) {
            setLoading(false);
            clearTimeout(loadingTimeout);
          }
        }
      } catch (err) {
        console.warn("[APP]: Backend sync skipped, waiting for cloud listener.");
      }

      if (!mounted) return;

      // 2. Start Real-time Firestore Listener (Source of Truth)
      const userRef = doc(db, "users", user.uid);
      
      const unsub = onSnapshot(userRef, (docSnap) => {
        if (!mounted) return;
        
        if (docSnap.exists()) {
          setUserData({ ...docSnap.data(), uid: user.uid, exists: true });
        } else {
          console.log("[APP]: Identity doc missing (new user).");
          setUserData({ exists: false, uid: user.uid });
        }
        setLoading(false);
        clearTimeout(loadingTimeout);
      }, (error) => {
        if (mounted) {
          console.warn("[APP]: Firestore listener error:", error.message);
          // If Firestore fails, we might still have backend data.
          setLoading(false);
          clearTimeout(loadingTimeout);
        }
      });

      // CRITICAL: If the component unmounted while the async sync was running, 
      // we MUST immediately kill the new listener to prevent "Internal Assertion" errors.
      if (!mounted) {
        unsub();
      } else {
        unsubSnapshot = unsub;
      }
    };

    initListener();

    return () => {
      mounted = false;
      clearTimeout(loadingTimeout);
      if (unsubSnapshot) {
        try { unsubSnapshot(); } catch (e) { /* silent fail on already closed stream */ }
      }
    };
  }, [user]);

  if (isMissingConfig && window.location.hostname !== 'localhost') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-red-100">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-2xl text-red-500 font-bold">!</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-4">Deployment Sync Error</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            The application is live, but it cannot connect to your Identity Database (Firebase). This usually happens because environment variables are missing in your hosting dashboard.
          </p>
          <div className="bg-gray-50 rounded-2xl p-4 space-y-3 mb-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Action Required:</p>
            <ol className="text-xs text-gray-600 space-y-2 list-decimal ml-4">
              <li>Open your <b>Vercel Project Dashboard</b></li>
              <li>Navigate to <b>Settings &gt; Environment Variables</b></li>
              <li>Add all <b>VITE_FIREBASE_...</b> keys from your local .env file</li>
              <li>Redeploy your project</li>
            </ol>
          </div>
          <a href="https://vercel.com/docs/concepts/projects/environment-variables" target="_blank" rel="noopener noreferrer" className="block w-full py-4 bg-black text-white rounded-xl font-black text-center text-[10px] uppercase tracking-widest shadow-xl">
            View Documentation
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
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
                ) : (() => {
                  const isAdmin = userData?.role === 'Admin' || user?.email === 'admin@gmail.com';
                  // Robust check: any of these fields indicate the user has data/onboarded
                  const hasData = userData?.onboarded || 
                                  userData?.phone || 
                                  userData?.company || 
                                  userData?.businessRole ||
                                  userData?.businessName || 
                                  userData?.companyName ||
                                  userData?.job || 
                                  isAdmin;
                                  
                  if (hasData) {
                    return isAdmin ? <Navigate to="/admin/analytics" /> : <Navigate to="/user/home" />;
                  }
                  return <Navigate to="/user/complete-profile" />;
                })()
              }
            />
            <Route
              path="/signup"
              element={
                !user ? (
                  <Signup />
                ) : (() => {
                  const isAdmin = userData?.role === 'Admin' || user?.email === 'admin@gmail.com';
                  const hasData = userData?.onboarded || 
                                  userData?.phone || 
                                  userData?.company || 
                                  userData?.businessRole ||
                                  userData?.businessName || 
                                  userData?.companyName ||
                                  userData?.job || 
                                  isAdmin;

                  if (hasData) {
                    return isAdmin ? <Navigate to="/admin/analytics" /> : <Navigate to="/user/home" />;
                  }
                  return <Navigate to="/user/complete-profile" />;
                })()
              }
            />

            {/* --- ADMIN PIPELINE --- */}
            <Route path="/admin/analytics" element={<CheckAuth user={user} userData={userData} loading={loading} adminOnly={true}><Analytics userData={userData} /></CheckAuth>} />
            <Route path="/admin/complete-profile" element={<CheckAuth user={user} userData={userData} loading={loading} adminOnly={true}><CompleteProfile userData={userData} onUserDataChange={setUserData} /></CheckAuth>} />
            <Route path="/admin/profile" element={<CheckAuth user={user} userData={userData} loading={loading} adminOnly={true}><Profile userData={userData} onUserDataChange={setUserData} /></CheckAuth>} />
            <Route path="/admin/users" element={<CheckAuth user={user} userData={userData} loading={loading} adminOnly={true}><Users userData={userData} /></CheckAuth>} />
            <Route path="/admin/templates" element={<CheckAuth user={user} userData={userData} loading={loading} adminOnly={true}><Templates userData={userData} /></CheckAuth>} />
            <Route path="/admin/inquiry" element={<CheckAuth user={user} userData={userData} loading={loading} adminOnly={true}><Inquiry userData={userData} /></CheckAuth>} />
            <Route path="/admin/settings" element={<CheckAuth user={user} userData={userData} loading={loading} adminOnly={true}><Settings userData={userData} /></CheckAuth>} />
            <Route path="/admin/templates/:id" element={<CheckAuth user={user} userData={userData} loading={loading} adminOnly={true}><TemplatePreview userData={userData} /></CheckAuth>} />

            {/* --- USER PIPELINE --- */}
            <Route path="/user/home" element={<CheckAuth user={user} userData={userData} loading={loading}><Home userData={userData} /></CheckAuth>} />
            <Route path="/user/templates" element={<CheckAuth user={user} userData={userData} loading={loading}><Templates userData={userData} /></CheckAuth>} />
            <Route path="/user/support" element={<CheckAuth user={user} userData={userData} loading={loading}><Support userData={userData} /></CheckAuth>} />
            <Route path="/user/profile" element={<CheckAuth user={user} userData={userData} loading={loading}><Profile userData={userData} onUserDataChange={setUserData} /></CheckAuth>} />
            <Route path="/user/templates/:id" element={<CheckAuth user={user} userData={userData} loading={loading}><TemplatePreview userData={userData} /></CheckAuth>} />
            <Route path="/user/complete-profile" element={<CheckAuth user={user} userData={userData} loading={loading}><CompleteProfile userData={userData} onUserDataChange={setUserData} /></CheckAuth>} />
            <Route path="/user/settings" element={<CheckAuth user={user} userData={userData} loading={loading}><UserSettings userData={userData} /></CheckAuth>} />

            {/* --- GLOBAL SYNC & FALLBACK --- */}
            <Route
              path="/"
              element={
                user ? (
                  (() => {
                    const isAdmin = userData?.role === 'Admin' || user?.email === 'admin@gmail.com';
                    const hasData = userData?.onboarded || 
                                    userData?.phone || 
                                    userData?.company || 
                                    userData?.businessRole ||
                                    userData?.businessName || 
                                    userData?.companyName ||
                                    userData?.job || 
                                    isAdmin;

                    if (hasData) {
                      return isAdmin ? <Navigate to="/admin/analytics" /> : <Navigate to="/user/home" />;
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

