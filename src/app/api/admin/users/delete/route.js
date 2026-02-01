import { authenticate } from "@/lib/auth";
import { authorizeRoles } from "@/lib/authorize";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const auth = await authenticate(req);
    if (auth.error) {
      return NextResponse.json(
        { message: auth.error },
        { status: auth.status }
      );
    }

    const roleCheck = authorizeRoles(auth.user.role, ["ADMIN"]);
    if (roleCheck.error) {
      return NextResponse.json(
        { message: roleCheck.error },
        { status: roleCheck.status }
      );
    }

    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Prevent admin from deleting themselves
    if (userId === auth.user.id) {
      return NextResponse.json(
        { message: "You cannot delete your own account" },
        { status: 400 }
      );
    }

    // Use transaction to delete user's logs first, then user
    await prisma.$transaction(async (tx) => {
      // Delete all activity logs for this user first
      await tx.activityLog.deleteMany({
        where: { userId: userId },
      });

      // Then delete the user
      await tx.user.delete({
        where: { id: userId },
      });
    });

    // Log the deletion action (using admin's userId)
    await prisma.activityLog.create({
      data: {
        userId: auth.user.id,
        action: `DELETED_USER_${userId}`,
      },
    });

    return NextResponse.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json(
      { message: "Failed to delete user" },
      { status: 500 }
    );
  }
}

