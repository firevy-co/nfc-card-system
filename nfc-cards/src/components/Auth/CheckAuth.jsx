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

    // 2b. USER IS AUTHENTICATED BUT PROFILE HASN'T LOADED FROM FIRESTORE YET.
    // Show a skeleton instead of making routing decisions with null data.
    // This is the primary fix for the race condition where already-onboarded users
    // get briefly redirected to the onboarding form before Firestore responds.
    if (!userData) {
        return <AppSkeleton />;
    }

    // 3. DOES USER HAVE APPROPRIATE CLEARANCE?
    if (adminOnly && userData?.role !== 'Admin') {
        console.warn(`[SECURITY VIOLATION]: Unauthorized access attempt by ${userData?.email}. Required: Admin.`);
        return <Navigate to="/user/home" />;
    }

    // 4. ONBOARDING ENFORCEMENT
    const isOnboardingPage = window.location.pathname === '/user/complete-profile' || window.location.pathname === '/admin/complete-profile';
    // hasData: true if the user has completed onboarding in any meaningful way.
    // Includes 'name' to catch users who only set personal (not business) info.
    const hasData = userData?.onboarded || userData?.phone || userData?.company || userData?.job || userData?.name;

    // If no data and not on the onboarding page, redirect to onboarding
    if (!hasData && !isOnboardingPage) {
        return <Navigate to="/user/complete-profile" />;
    }

    // If has data and trying to access onboarding page, redirect to correct panel
    if (hasData && isOnboardingPage) {
        if (userData.role === 'Admin') return <Navigate to="/admin/analytics" />;
        return <Navigate to="/user/home" />;
    }

    // 5. APPROVED: Inject identity context into children
    if (React.isValidElement(children)) {
        return React.cloneElement(children, { user, userData, onUserDataChange: children.props.onUserDataChange });
    }
    return children;
};

export default ProtectedRoute;
