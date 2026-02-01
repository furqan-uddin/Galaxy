"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

function DashboardContent() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen p-6 bg-gray-50/50">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Welcome Card */}
                <Card className="border-l-4 border-l-primary shadow-sm overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <CardHeader>
                        <CardTitle className="text-3xl">Welcome back, {user?.name || user?.email?.split('@')[0]}!</CardTitle>
                        <CardDescription>
                            Here's what's happening with your account today.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                        <div className="flex flex-wrap items-center gap-3 text-gray-600">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20">
                                {user?.email}
                            </span>
                            <Badge variant={
                                user?.role === "ADMIN" ? "destructive" :
                                    user?.role === "MANAGER" ? "default" :
                                        "secondary"
                            } className="px-3 py-1 text-sm">
                                {user?.role} Role
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions Grid */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* View Profile */}
                        <Link href="/dashboard/profile">
                            <Card className="hover:shadow-md transition-all hover:bg-gray-50/50 cursor-pointer h-full group">
                                <CardHeader className="space-y-1">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    </div>
                                    <CardTitle className="text-base">My Profile</CardTitle>
                                    <CardDescription>View personal details</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>

                        {/* Change Password */}
                        <Link href="/dashboard/security">
                            <Card className="hover:shadow-md transition-all hover:bg-gray-50/50 cursor-pointer h-full group">
                                <CardHeader className="space-y-1">
                                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 mb-2 group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                    </div>
                                    <CardTitle className="text-base">Security</CardTitle>
                                    <CardDescription>Update password</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>

                        {/* Contact Support */}
                        <Link href="/contact">
                            <Card className="hover:shadow-md transition-all hover:bg-gray-50/50 cursor-pointer h-full group">
                                <CardHeader className="space-y-1">
                                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 mb-2 group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" /><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" /></svg>
                                    </div>
                                    <CardTitle className="text-base">Support</CardTitle>
                                    <CardDescription>Get help & feedback</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>

                        {/* Admin Tools (Conditional) */}
                        {user?.role === "ADMIN" && (
                            <Link href="/dashboard/admin">
                                <Card className="hover:shadow-md transition-all hover:bg-purple-50/50 cursor-pointer h-full group border-purple-200 bg-purple-50/20">
                                    <CardHeader className="space-y-1">
                                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mb-2 group-hover:scale-110 transition-transform">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
                                        </div>
                                        <CardTitle className="text-base text-purple-700">Admin</CardTitle>
                                        <CardDescription className="text-purple-600/70">Manage Users</CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}
