"use client";

import { useState } from "react";
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

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            toast.success("Password reset link sent! Check your email.");
            setSent(true);
        } catch (err) {
            toast.error(err?.message || "Failed to send reset link");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email and we'll send you a reset link
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {!sent ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Sending..." : "Send Reset Link"}
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center space-y-4 py-4">
                            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <span className="text-3xl">✓</span>
                            </div>
                            <div className="space-y-2">
                                <p className="font-medium text-green-600">Email Sent!</p>
                                <p className="text-sm text-gray-600">
                                    Check your inbox for the password reset link.
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="mt-6 text-center text-sm space-y-2">
                        <p>
                            <Link href="/login" className="text-blue-600 hover:underline">
                                Back to Login
                            </Link>
                        </p>
                        <p>
                            <span className="text-gray-600">Don't have an account? </span>
                            <Link href="/register" className="text-blue-600 hover:underline font-medium">
                                Register
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
