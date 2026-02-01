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

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    if (user.isEmailVerified) {
      return NextResponse.json({
        message: "Email already verified",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hrs

    await prisma.user.update({
      where: { email },
      data: {
        emailVerifyToken: token,
        emailVerifyExpiry: expiry,
      },
    });

    const verifyLink = `${process.env.APP_URL}/verify-email?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Verify your email",
      html: `
        <h2>Email Verification</h2>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verifyLink}">${verifyLink}</a>
        <p>This link is valid for 24 hours.</p>
      `,
    });

    return NextResponse.json({
      message: "Verification email sent",
    });
  } catch (error) {
    console.error("Send verification error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
