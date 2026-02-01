"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * ProtectedRoute component that wraps pages requiring authentication
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to render if authorized
 * @param {string} [props.requiredRole] - Optional role required to access (e.g., "ADMIN", "MANAGER")
 * @param {string} [props.redirectTo] - Where to redirect if unauthorized (default: "/login" for no user, "/dashboard" for wrong role)
 */
export default function ProtectedRoute({
    children,
    requiredRole = null,
    redirectTo = null
}) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        // No user - redirect to login
        if (!user) {
            router.push(redirectTo || "/login");
            return;
        }

        // User exists but wrong role
        if (requiredRole && user.role !== requiredRole) {
            router.push(redirectTo || "/dashboard");
            return;
        }
    }, [user, loading, router, requiredRole, redirectTo]);

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-gray-600">Loading...</div>
            </div>
        );
    }

    // Not authenticated
    if (!user) {
        return null;
    }

    // Wrong role
    if (requiredRole && user.role !== requiredRole) {
        return null;
    }

    // Authorized - render children
    return children;
}
