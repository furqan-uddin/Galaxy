import { authenticate } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { comparePassword, hashPassword } from "@/lib/password";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. Authenticate user
    const auth = await authenticate(req);

    if (auth.error) {
      return NextResponse.json(
        { message: auth.error },
        { status: auth.status }
      );
    }

    const user = auth.user;

    // 2. Read request body
    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Current and new password are required" },
        { status: 400 }
      );
    }

    // 3. Fetch full user (with password)
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    // 4. Verify current password
    const isValid = await comparePassword(
      currentPassword,
      dbUser.password
    );

    if (!isValid) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 401 }
      );
    }

    // 5. Hash new password
    const hashedNewPassword = await hashPassword(newPassword);

    // 6. Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    });

    // 7. Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "CHANGE_PASSWORD",
      },
    });

    return NextResponse.json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
