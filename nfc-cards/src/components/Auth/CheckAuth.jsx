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

    // 4. APPROVED: Inject identity context into children
    if (React.isValidElement(children)) {
        return React.cloneElement(children, { user, userData });
    }
    return children;
};

export default ProtectedRoute;
