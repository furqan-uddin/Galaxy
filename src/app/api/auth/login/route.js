import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/password";
import { generateToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password, captchaToken } = await req.json();

    // 🔒 1. Validate captcha token
    if (!captchaToken) {
      return NextResponse.json(
        { message: "Captcha token missing" },
        { status: 400 }
      );
    }

    // 🔒 2. Verify captcha with Google
    const captchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: captchaToken,
        }),
      }
    );

    const captchaData = await captchaRes.json();

    const minScore =
      process.env.NODE_ENV === "production" ? 0.5 : 0.1;

    if (
      !captchaData.success ||
      captchaData.score < minScore ||
      captchaData.action !== "login"
    ) {
      return NextResponse.json(
        { message: "Captcha verification failed" },
        { status: 403 }
      );
    }

    // 🔒 3. Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // 🔒 4. Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (!user.isEmailVerified) {
      // Check if verification token has expired
      const isTokenExpired = user.emailVerifyExpiry && new Date() > new Date(user.emailVerifyExpiry);

      return NextResponse.json(
        {
          message: isTokenExpired
            ? "Your verification link has expired. Please request a new one."
            : "Please verify your email before logging in. Check your inbox.",
          code: "EMAIL_NOT_VERIFIED",
          expired: isTokenExpired,
          email: user.email, // Return email so frontend can resend
        },
        { status: 403 }
      );
    }

    // 🔒 5. Compare password
    const isPasswordValid = await comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 🔒 6. Generate JWT
    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    // 🔒 7. Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "LOGIN",
      },
    });

    // ✅ 8. Success response
    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
