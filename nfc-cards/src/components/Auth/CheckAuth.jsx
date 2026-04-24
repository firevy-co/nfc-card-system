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

    // 3. DOES USER HAVE APPROPRIATE CLEARANCE?
    if (adminOnly && userData?.role !== 'Admin') {
        console.warn(`[SECURITY VIOLATION]: Unauthorized access attempt by ${userData?.email}. Required: Admin.`);
        return <Navigate to="/user/home" />;
    }

    // 4. ONBOARDING ENFORCEMENT
    // If not onboarded and not on the onboarding page, redirect to onboarding
    const isOnboardingPage = window.location.pathname === '/user/complete-profile' || window.location.pathname === '/admin/complete-profile';
    
    if (userData && userData.role !== 'Admin' && !userData.onboarded && !isOnboardingPage) {
        return <Navigate to="/user/complete-profile" />;
    }

    // If already onboarded and trying to access onboarding page, redirect to home
    if (userData?.onboarded && isOnboardingPage) {
        return <Navigate to="/user/home" />;
    }

    // 5. APPROVED: Inject identity context into children
    if (React.isValidElement(children)) {
        return React.cloneElement(children, { user, userData });
    }
    return children;
};

export default ProtectedRoute;
