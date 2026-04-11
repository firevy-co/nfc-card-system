import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.config';
import { ThemeProvider } from './context/ThemeContext';

// --- PERFORMANCE: DYNAMIC CODE SPLITTING (Lazy Loading) ---
const Login = lazy(() => import('./components/Auth/Login'));
const Signup = lazy(() => import('./components/Auth/Signup'));
const CompleteProfile = lazy(() => import('./components/Auth/CompleteProfile'));
const Profile = lazy(() => import('./components/Auth/Profile'));
const Templates = lazy(() => import('./components/layout/Templates'));
const Users = lazy(() => import('./components/layout/Users'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));
const TemplatePreview = lazy(() => import('./pages/admin/TemplatePreview'));
const Home = lazy(() => import('./pages/user/Home').then(module => ({ default: module.Home })));

// --- AUTH & SECURITY CONTROLLER ---
import CheckAuth from './components/Auth/CheckAuth';
import AppSkeleton from './components/layout/AppSkeleton';

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      // START IDENTITY HANDSHAKE
      if (authenticatedUser) {
        setUser(authenticatedUser);
        console.log(`[AUTH HUB]: Synchronizing Identity for ${authenticatedUser.email}`);

        try {
          const { doc, getDoc, setDoc, updateDoc, serverTimestamp } = await import('firebase/firestore');
          const { db } = await import('./firebase.config');
          const userRef = doc(db, "users", authenticatedUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const currentData = userSnap.data();
            console.log(`[CLEARANCE]: Current role detected as ${currentData.role}`);
            setUserData(currentData);
          } else {
            console.log("[IDENTITY]: New Node detected. Initializing with User clearance.");
            const newUser = {
              uid: authenticatedUser.uid,
              displayName: authenticatedUser.displayName || 'Architect',
              email: authenticatedUser.email,
              role: 'User',
              createdAt: serverTimestamp(),
              status: 'Active'
            };
            await setDoc(userRef, newUser);
            setUserData(newUser);
          }
        } catch (error) {
          console.error("[CRITICAL]: Identity Synchronization Failed:", error);
          setUserData({ role: 'User', email: authenticatedUser.email, syncError: true });
        }
      } else {
        setUser(null);
        setUserData(null);
      }

      // END HANDSHAKE: Release the loading lock
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const Spinner = () => <AppSkeleton />;

  return (
    <ThemeProvider>
      <Router>
        <Suspense fallback={<Spinner />}>
          <Routes>
            {/* --- PUBLIC ACCESS --- */}
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
            <Route path="/admin/profile" element={<CheckAuth user={user} userData={userData} loading={loading} adminOnly={true}><Profile /></CheckAuth>} />
            <Route path="/admin/users" element={<CheckAuth user={user} userData={userData} loading={loading} adminOnly={true}><Users /></CheckAuth>} />
            <Route path="/admin/templates" element={<CheckAuth user={user} userData={userData} loading={loading} adminOnly={true}><Templates /></CheckAuth>} />
            <Route path="/admin/templates/:id" element={<CheckAuth user={user} userData={userData} loading={loading} adminOnly={true}><TemplatePreview userData={userData} /></CheckAuth>} />

            {/* --- USER PIPELINE --- */}
            <Route path="/user/home" element={<CheckAuth user={user} userData={userData} loading={loading}><Home /></CheckAuth>} />
            <Route path="/user/templates" element={<CheckAuth user={user} userData={userData} loading={loading}><Templates /></CheckAuth>} />
            <Route path="/user/templates/:id" element={<CheckAuth user={user} userData={userData} loading={loading}><TemplatePreview userData={userData} /></CheckAuth>} />
            <Route path="/user/complete-profile" element={<CheckAuth user={user} userData={userData} loading={loading}><CompleteProfile /></CheckAuth>} />

            {/* --- GLOBAL SYNC & FALLBACK --- */}
            <Route
              path="/"
              element={
                user ? (
                  userData?.role === 'Admin' ? (
                    <Navigate to="/admin/analytics" />
                  ) : userData?.onboarded ? (
                    <Navigate to="/user/home" />
                  ) : (
                    <Navigate to="/user/complete-profile" />
                  )
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
