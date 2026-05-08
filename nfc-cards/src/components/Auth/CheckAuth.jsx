import React from 'react';
import { Navigate } from 'react-router-dom';
import AppSkeleton from '../layout/AppSkeleton';

const ProtectedRoute = ({ children, user, userData, loading, adminOnly = false }) => {
    // 1. IS APP BOOTING? (Loading state from Firebase handshake)
    if (loading) {
        return <AppSkeleton />;
    }

    // 2. IS USER AUTHENTICATED?
    if (!user) {
        return <Navigate to="/login" />;
    }

    // 2b. CLEARANCE CHECK
    // We allow the render to proceed even if userData is being fetched,
    // as long as the initial App handshake has finished.
    // Redirections are handled by the main Routes logic in App.jsx.

    // 3. DOES USER HAVE APPROPRIATE CLEARANCE?
    const isAdmin = userData?.role === 'Admin' || user?.email === 'admin@gmail.com';

    if (adminOnly && !isAdmin) {
        console.warn(`[SECURITY VIOLATION]: Unauthorized access attempt by ${user?.email}. Required: Admin.`);
        return <Navigate to="/user/home" />;
    }

    // 4. ONBOARDING ENFORCEMENT
    const isOnboardingPage = window.location.pathname === '/user/complete-profile' || window.location.pathname === '/admin/complete-profile';
    
    // hasData: true if the user has completed onboarding in any meaningful way.
    const hasData = userData?.onboarded || 
                    userData?.phone || 
                    userData?.company || 
                    userData?.businessRole ||
                    userData?.businessName || 
                    userData?.companyName || 
                    userData?.job || 
                    userData?.bio ||
                    isAdmin;

    // CRITICAL: We only redirect to onboarding if we are CERTAIN the document does not exist.
    // If hasData is true, they definitely don't need to be on the onboarding page.
    const identityIsMissing = userData?.exists === false;

    // If they have data and are trying to access onboarding page, redirect to correct panel
    if (hasData && isOnboardingPage) {
        console.log("[AUTH_GUARD]: User already has data. Redirecting away from onboarding.");
        if (isAdmin) return <Navigate to="/admin/analytics" />;
        return <Navigate to="/user/home" />;
    }

    // Only redirect to onboarding if we are CERTAIN the identity is missing AND they aren't already there.
    if (identityIsMissing && !isOnboardingPage && !hasData) {
        console.log("[AUTH_GUARD]: Identity missing confirmed. Redirecting to onboarding.");
        return <Navigate to="/user/complete-profile" />;
    }

    // 5. APPROVED: Inject identity context into children
    if (React.isValidElement(children)) {
        return React.cloneElement(children, { user, userData, onUserDataChange: children.props.onUserDataChange });
    }
    return children;
};

export default ProtectedRoute;
