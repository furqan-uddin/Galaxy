import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mailer";
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

        // Send email notification to admin
        try {
            await sendEmail({
                to: process.env.EMAIL_USER,
                subject: `New Contact Form Submission from ${name}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333;">New Contact Form Submission</h2>
                        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                            <p style="margin: 10px 0;"><strong>Message:</strong></p>
                            <p style="background-color: white; padding: 15px; border-left: 3px solid #007bff; margin: 10px 0;">${message}</p>
                        </div>
                        <p style="color: #666; font-size: 12px;">This message was sent via the contact form on your website.</p>
                    </div>
                `,
            });
        } catch (emailError) {
            // Log email error but don't fail the request - message is still saved to DB
            console.error("Failed to send email notification:", emailError);
        }

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
