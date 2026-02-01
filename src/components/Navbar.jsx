"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="w-full border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
                    <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center text-white text-lg font-bold">
                        G
                    </div>
                    Galaxy
                </Link>

                <div className="flex gap-1 items-center">
                    {/* Public Pages */}
                    <div className="hidden md:flex gap-1 mr-4">
                        <Link href="/">
                            <Button variant="ghost" size="sm">Home</Button>
                        </Link>
                        <Link href="/about">
                            <Button variant="ghost" size="sm">About</Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="ghost" size="sm">Contact</Button>
                        </Link>
                    </div>

                    {/* Auth-based Navigation */}
                    <div className="flex gap-2 items-center pl-4 border-l ml-2">
                        {!user && (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" size="sm">Login</Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="sm">Register</Button>
                                </Link>
                            </>
                        )}

                        {user && (
                            <>
                                <Link href="/dashboard">
                                    <Button variant="ghost" size="sm">Dashboard</Button>
                                </Link>

                                {user.role === "ADMIN" && (
                                    <Link href="/dashboard/admin">
                                        <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                                            Admin
                                        </Button>
                                    </Link>
                                )}

                                <Button
                                    onClick={logout}
                                    variant="destructive"
                                    size="sm"
                                    className="ml-2"
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
