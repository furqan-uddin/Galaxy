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
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Welcome Card */}
                <Card className="border-l-4 border-l-primary shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Welcome, {user?.name}!</CardTitle>
                        <CardDescription>
                            Manage your account settings and preferences
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-600">
                            <span>Logged in as:</span>
                            <span className="font-medium text-foreground">{user?.email}</span>
                            <Badge variant={
                                user?.role === "ADMIN" ? "destructive" :
                                    user?.role === "MANAGER" ? "default" :
                                        "secondary"
                            }>
                                {user?.role}
                            </Badge>
                        </div>
                        <div className="pt-2">
                            <Button variant="destructive" onClick={logout} size="sm">
                                Logout
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-lg">Profile Management</CardTitle>
                            <CardDescription>Update your personal details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                View detailed profile information, update your profile picture,
                                or change your account password securely.
                            </p>
                            <Link href="/dashboard/profile">
                                <Button variant="outline" className="w-full">
                                    Go to Profile
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {user?.role === "ADMIN" && (
                        <Card className="hover:shadow-md transition-shadow border-yellow-200 bg-yellow-50/10">
                            <CardHeader>
                                <CardTitle className="text-lg text-yellow-700">Admin Portal</CardTitle>
                                <CardDescription>System administration tools</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-yellow-800/80">
                                    Access user management system, role assignments, and
                                    comprehensive activity trails.
                                </p>
                                <Link href="/dashboard/admin">
                                    <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                                        Open Admin Panel
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
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
