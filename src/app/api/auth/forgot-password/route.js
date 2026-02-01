import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendEmail } from "@/lib/mailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Security: always return same message
    if (!user) {
      return NextResponse.json({
        message: "If the email exists, a reset link has been sent",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpiry: expiry,
      },
    });

    const resetLink = `${process.env.APP_URL}/reset-password?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Reset your password",
      html: `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link is valid for 15 minutes.</p>
      `,
    });

    return NextResponse.json({
      message: "If the email exists, a reset link has been sent",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
