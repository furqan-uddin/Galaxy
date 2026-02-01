"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ProtectedRoute from "@/components/ProtectedRoute";

function ProfileContent() {
    const { user } = useAuth();
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [changing, setChanging] = useState(false);

    // Upload profile image
    const handleImageUpload = async () => {
        if (!image) {
            toast.error("Please select an image");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        try {
            setUploading(true);
            const res = await fetch("/api/profile/upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            toast.success("Profile image updated");
            setImage(null);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setUploading(false);
        }
    };

    // Change password
    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword) {
            toast.error("All password fields are required");
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
                body: JSON.stringify({ currentPassword, newPassword, }),
            });

            toast.success("Password changed successfully");
            setCurrentPassword("");
            setNewPassword("");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setChanging(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* User Info & Image */}
                    <div className="w-full md:w-1/3 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Details</CardTitle>
                                <CardDescription>Your personal information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <div className="p-2 bg-gray-50 rounded-md border text-sm font-medium">
                                        {user?.name}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Email Address</Label>
                                    <div className="p-2 bg-gray-50 rounded-md border text-sm text-gray-600">
                                        {user?.email}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Current Role</Label>
                                    <div>
                                        <Badge variant={
                                            user?.role === "ADMIN" ? "destructive" :
                                                user?.role === "MANAGER" ? "default" :
                                                    "secondary"
                                        }>
                                            {user?.role}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Image</CardTitle>
                                <CardDescription>Update your avatar</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="picture">Select Image</Label>
                                    <Input
                                        id="picture"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Supported formats: JPG, PNG, GIF
                                    </p>
                                </div>
                                <Button onClick={handleImageUpload} disabled={uploading} className="w-full">
                                    {uploading ? "Uploading..." : "Upload New Image"}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Security Settings */}
                    <div className="w-full md:w-2/3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                                <CardDescription>Manage your password and authentication</CardDescription>
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
                                </div>

                                <div className="pt-4 border-t">
                                    <Button onClick={handleChangePassword} disabled={changing} className="ml-auto block">
                                        {changing ? "Updating..." : "Update Password"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProfilePage() {
    return (
        <ProtectedRoute>
            <ProfileContent />
        </ProtectedRoute>
    );
}
