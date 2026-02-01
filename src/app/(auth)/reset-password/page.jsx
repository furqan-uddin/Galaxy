"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";

function ResetPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword: password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            toast.success("Password reset successful!");
            router.push("/login");
        } catch (err) {
            toast.error(err?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="text-center space-y-4">
                <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-3xl">✕</span>
                </div>
                <div className="space-y-2">
                    <p className="font-medium text-red-600">Invalid Reset Link</p>
                    <p className="text-sm text-gray-600">
                        This password reset link is invalid or has expired.
                    </p>
                </div>
                <Link href="/forgot-password">
                    <Button variant="outline">Request New Link</Button>
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                />
                <p className="text-xs text-gray-500">Minimum 6 characters</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
            </Button>

            <div className="text-center text-sm pt-2">
                <Link href="/login" className="text-blue-600 hover:underline">
                    Back to Login
                </Link>
            </div>
        </form>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
                    <CardDescription className="text-center">
                        Enter your new password below
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
                        <ResetPasswordContent />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    );
}
