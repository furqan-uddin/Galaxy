"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Shield } from "lucide-react";

function SecurityContent() {
    const { user } = useAuth();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [changing, setChanging] = useState(false);

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("All password fields are required");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("New password must be at least 6 characters");
            return;
        }

        try {
            setChanging(true);
            await apiRequest("/auth/change-password", {
                method: "POST",
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            toast.success("Password changed successfully");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setChanging(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-6">
            <div className="max-w-3xl mx-auto space-y-6">
                <BackButton />

                <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                        <Shield className="h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Security Settings</h1>
                        <p className="text-sm text-gray-500">Manage your password and account security</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Update your password to keep your account secure</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input
                                    id="current-password"
                                    type="password"
                                    placeholder="Enter your current password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input
                                    id="new-password"
                                    type="password"
                                    placeholder="Enter a strong new password (min. 6 chars)"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm New Password</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    placeholder="Re-enter your new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <Button onClick={handleChangePassword} disabled={changing} className="ml-auto block">
                                {changing ? "Updating..." : "Update Password"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-amber-200 bg-amber-50/30">
                    <CardHeader>
                        <CardTitle className="text-base">Password Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                            <li>Use at least 6 characters (longer is better)</li>
                            <li>Mix uppercase and lowercase letters</li>
                            <li>Include numbers and special characters</li>
                            <li>Avoid common words or personal information</li>
                            <li>Don't reuse passwords from other accounts</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function SecurityPage() {
    return (
        <ProtectedRoute>
            <SecurityContent />
        </ProtectedRoute>
    );
}
