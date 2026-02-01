import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { message: "Verification token required" },
        { status: 400 }
      );
    }

    // First, try to find user with this token (regardless of expiry)
    const userWithToken = await prisma.user.findFirst({
      where: {
        emailVerifyToken: token,
      },
    });

    // Token not found at all
    if (!userWithToken) {
      return NextResponse.json(
        { message: "Invalid verification token", code: "INVALID_TOKEN" },
        { status: 400 }
      );
    }

    // Token found but expired
    if (userWithToken.emailVerifyExpiry && new Date() > new Date(userWithToken.emailVerifyExpiry)) {
      return NextResponse.json(
        {
          message: "Verification link has expired. Please request a new one.",
          code: "TOKEN_EXPIRED",
          expired: true,
        },
        { status: 400 }
      );
    }

    // Already verified
    if (userWithToken.isEmailVerified) {
      return NextResponse.json(
        { message: "Email is already verified", code: "ALREADY_VERIFIED" },
        { status: 200 }
      );
    }

    await prisma.user.update({
      where: { id: userWithToken.id },
      data: {
        isEmailVerified: true,
        emailVerifyToken: null,
        emailVerifyExpiry: null,
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: userWithToken.id,
        action: "EMAIL_VERIFIED",
      },
    });

    return NextResponse.json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Verify email error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
