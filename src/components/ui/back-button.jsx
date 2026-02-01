"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BackButton({ className }) {
    const router = useRouter();

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className={`gap-2 pl-0 hover:bg-transparent hover:text-primary ${className}`}
        >
            <ArrowLeft className="h-4 w-4" />
            Back
        </Button>
    );
}
