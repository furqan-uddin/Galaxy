"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="w-full border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
                        <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center text-white text-lg font-bold">
                            G
                        </div>
                        <span className="hidden sm:inline">Galaxy</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-1 items-center">
                        <div className="flex gap-1 mr-4">
                            <Link href="/"><Button variant="ghost" size="sm">Home</Button></Link>
                            <Link href="/about"><Button variant="ghost" size="sm">About</Button></Link>
                            <Link href="/contact"><Button variant="ghost" size="sm">Contact</Button></Link>
                        </div>

                        <div className="flex gap-2 items-center pl-4 border-l ml-2">
                            {!user ? (
                                <>
                                    <Link href="/login"><Button variant="ghost" size="sm">Login</Button></Link>
                                    <Link href="/register"><Button size="sm">Register</Button></Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/dashboard"><Button variant="ghost" size="sm">Dashboard</Button></Link>
                                    {user.role === "ADMIN" && (
                                        <Link href="/dashboard/admin">
                                            <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">Admin</Button>
                                        </Link>
                                    )}
                                    <Button onClick={logout} variant="destructive" size="sm" className="ml-2">Logout</Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
                    <Link href="/" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">Home</Button>
                    </Link>
                    <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">About</Button>
                    </Link>
                    <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">Contact</Button>
                    </Link>

                    <div className="border-t my-2 pt-2">
                        {!user ? (
                            <div className="space-y-2">
                                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="ghost" className="w-full justify-start">Login</Button>
                                </Link>
                                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                                    <Button className="w-full">Register</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
                                </Link>
                                {user.role === "ADMIN" && (
                                    <Link href="/dashboard/admin" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="ghost" className="w-full justify-start text-amber-600">Admin Panel</Button>
                                    </Link>
                                )}
                                <Button onClick={logout} variant="destructive" className="w-full mt-2">Logout</Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
