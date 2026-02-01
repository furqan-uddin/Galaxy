"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";
import ProtectedRoute from "@/components/ProtectedRoute";
import { User as UserIcon, Upload } from "lucide-react";

function ProfileContent() {
    const { user, refreshUser } = useAuth();
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Handle file selection and preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

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

            toast.success("Profile image updated successfully");
            setImage(null);
            setPreviewUrl(null);

            // Refresh user data to get updated profile image
            await refreshUser();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <BackButton />

                <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                        <UserIcon className="h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
                        <p className="text-sm text-gray-500">Manage your personal information and profile picture</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Details */}
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Details</CardTitle>
                                <CardDescription>Your personal information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <div className="p-3 bg-gray-50 rounded-md border text-sm font-medium">
                                        {user?.name}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Email Address</Label>
                                    <div className="p-3 bg-gray-50 rounded-md border text-sm text-gray-600">
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
                                        } className="text-sm">
                                            {user?.role}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Account Created</Label>
                                    <div className="p-3 bg-gray-50 rounded-md border text-sm text-gray-600">
                                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : 'N/A'}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Profile Image */}
                    <div className="md:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Picture</CardTitle>
                                <CardDescription>Update your avatar</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Current/Preview Image */}
                                <div className="flex justify-center">
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                                        {previewUrl ? (
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : user?.profileImage ? (
                                            <img
                                                src={user.profileImage}
                                                alt={user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 text-4xl font-bold">
                                                {user?.email?.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="picture" className="flex items-center gap-2">
                                        <Upload className="h-4 w-4" />
                                        Select Image
                                    </Label>
                                    <Input
                                        id="picture"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        JPG, PNG, or GIF (max 2MB)
                                    </p>
                                </div>

                                <Button
                                    onClick={handleImageUpload}
                                    disabled={uploading || !image}
                                    className="w-full"
                                >
                                    {uploading ? "Uploading..." : "Upload New Image"}
                                </Button>

                                {previewUrl && (
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setImage(null);
                                            setPreviewUrl(null);
                                        }}
                                        className="w-full"
                                    >
                                        Cancel
                                    </Button>
                                )}
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
