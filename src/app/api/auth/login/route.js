import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/password";
import { generateToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // 2. Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 3. Compare password
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

    // 4. Generate token
    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    // 5. Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "LOGIN",
      },
    });

    // 6. Send response
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
