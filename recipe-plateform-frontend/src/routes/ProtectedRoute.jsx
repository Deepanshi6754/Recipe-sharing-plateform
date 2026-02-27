import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Loader = () => (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <p>Loading...</p>
    </div>
);

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, token, loading } = useAuth() || {};

    // Show loader while auth state is being resolved
    if (loading) return <Loader />;

    // Redirect if not logged in
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    // Optional role-based protection
    if (requiredRole && (!user.role || user.role !== requiredRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Otherwise render the protected children
    return children;
};

export default ProtectedRoute;
