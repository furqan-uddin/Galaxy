import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { name, email, message } = await req.json();

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { message: "Name, email, and message are required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: "Invalid email format" },
                { status: 400 }
            );
        }

        // Save contact message to database
        const contactMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                message,
            },
        });

        return NextResponse.json(
            {
                message: "Message sent successfully",
                id: contactMessage.id,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { message: "Failed to send message" },
            { status: 500 }
        );
    }
}

// GET endpoint for admin to view messages
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        const [messages, total] = await Promise.all([
            prisma.contactMessage.findMany({
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.contactMessage.count(),
        ]);

        return NextResponse.json({
            messages,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Fetch messages error:", error);
        return NextResponse.json(
            { message: "Failed to fetch messages" },
            { status: 500 }
        );
    }
}
