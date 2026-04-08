import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, user, userData, loading, adminOnly = false }) => {
    // 1. IS APP BOOTING? (Loading state from Firebase handshake)
    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin"></div>
            </div>
        );
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
