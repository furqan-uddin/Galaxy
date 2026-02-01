"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation"; // Added for active route highlighting
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react"; // Added User icon for avatar fallback

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname(); // Get current path

    // Helper to check if link is active
    const isActive = (path) => pathname === path;

    return (
        <nav className="w-full border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo - Groups left */}
                    <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center text-white text-lg font-bold shadow-sm">
                            G
                        </div>
                        <span className="hidden sm:inline bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Galaxy</span>
                    </Link>

                    {/* Desktop Navigation - Center */}
                    <div className="hidden md:flex gap-1 items-center">
                        <div className="flex gap-1 mr-4">
                            <Link href="/">
                                <Button
                                    variant={isActive("/") ? "secondary" : "ghost"}
                                    size="sm"
                                    className={isActive("/") ? "font-medium" : "text-gray-600"}
                                >
                                    Home
                                </Button>
                            </Link>
                            <Link href="/about">
                                <Button
                                    variant={isActive("/about") ? "secondary" : "ghost"}
                                    size="sm"
                                    className={isActive("/about") ? "font-medium" : "text-gray-600"}
                                >
                                    About
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button
                                    variant={isActive("/contact") ? "secondary" : "ghost"}
                                    size="sm"
                                    className={isActive("/contact") ? "font-medium" : "text-gray-600"}
                                >
                                    Contact
                                </Button>
                            </Link>
                        </div>

                        {/* Auth / User Actions - Right Grouping */}
                        <div className="flex gap-2 items-center pl-4 border-l border-gray-200 ml-2">
                            {!user ? (
                                <>
                                    <Link href="/login">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-600 hover:text-primary"
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button size="sm" className="shadow-sm">Register</Button>
                                    </Link>
                                </>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link href="/dashboard">
                                        <Button
                                            variant={isActive("/dashboard") ? "secondary" : "ghost"}
                                            size="sm"
                                            className={isActive("/dashboard") ? "font-medium" : ""}
                                        >
                                            Dashboard
                                        </Button>
                                    </Link>

                                    {user.role === "ADMIN" && (
                                        <Link href="/dashboard/admin">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={`hover:bg-amber-50 ${isActive("/dashboard/admin") ? "text-amber-700 bg-amber-50" : "text-amber-600 hover:text-amber-700"}`}
                                            >
                                                Admin
                                            </Button>
                                        </Link>
                                    )}

                                    {/* User Avatar / Profile Indicator */}
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20" title={user.email}>
                                        <span className="text-xs font-semibold">
                                            {user.email?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                                        </span>
                                    </div>

                                    <Button onClick={logout} variant="destructive" size="sm" className="ml-1 shadow-sm h-8 text-xs">
                                        Logout
                                    </Button>
                                </div>
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
                <div className="md:hidden border-t bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
                    <Link href="/" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className={`w-full justify-start ${isActive("/") ? "bg-secondary font-medium" : ""}`}>Home</Button>
                    </Link>
                    <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className={`w-full justify-start ${isActive("/about") ? "bg-secondary font-medium" : ""}`}>About</Button>
                    </Link>
                    <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className={`w-full justify-start ${isActive("/contact") ? "bg-secondary font-medium" : ""}`}>Contact</Button>
                    </Link>

                    <div className="border-t my-2 pt-2 border-gray-100">
                        {!user ? (
                            <div className="space-y-2">
                                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="ghost" className="w-full justify-start">Login</Button>
                                </Link>
                                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                                    <Button className="w-full shadow-sm">Register</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-md mb-2">
                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold border border-primary/20">
                                        {user.email?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-medium text-gray-600 truncate">{user.email}</span>
                                </div>

                                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="ghost" className={`w-full justify-start ${isActive("/dashboard") ? "bg-secondary font-medium" : ""}`}>Dashboard</Button>
                                </Link>
                                {user.role === "ADMIN" && (
                                    <Link href="/dashboard/admin" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="ghost" className={`w-full justify-start text-amber-600 ${isActive("/dashboard/admin") ? "bg-amber-50" : ""}`}>Admin Panel</Button>
                                    </Link>
                                )}
                                <Button onClick={logout} variant="destructive" className="w-full mt-2 shadow-sm">Logout</Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
