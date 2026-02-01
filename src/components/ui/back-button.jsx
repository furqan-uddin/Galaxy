"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BackButton({ className }) {
    const router = useRouter();
    const pathname = usePathname();

    // Do NOT show on: Home, Dashboard root, Login, Register
    const excludedPaths = ["/", "/dashboard", "/login", "/register"];

    // Also likely exclude if strictly on the landing page of admin dashboard if desired, but instruction said "Dashboard root".
    // "secondary pages" implies deeper navigation.

    if (excludedPaths.includes(pathname)) {
        return null;
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className={`gap-2 pl-0 hover:bg-transparent hover:text-primary mb-4 ${className}`}
        >
            <ArrowLeft className="h-4 w-4" />
            Back
        </Button>
    );
}
