"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changing, setChanging] = useState(false);

  // Protect route
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (!user) return null;

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

      const res = await fetch(
        "http://localhost:3000/api/profile/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Profile image updated");
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

    try {
      setChanging(true);

      await apiRequest("/auth/change-password", {
        method: "POST",
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Profile Image */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <Button onClick={handleImageUpload} disabled={uploading}>
              {uploading ? "Uploading..." : "Upload Image"}
            </Button>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
            />
            <Input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
            />
            <Button onClick={handleChangePassword} disabled={changing}>
              {changing ? "Updating..." : "Change Password"}
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
