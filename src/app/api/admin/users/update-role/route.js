import { authenticate } from "@/lib/auth";
import { authorizeRoles } from "@/lib/authorize";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { isValidRole, VALID_ROLES } from "@/lib/apiHandler";

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

    const { userId, role } = await req.json();

    if (!userId || !role) {
      return NextResponse.json(
        { message: "User ID and role are required" },
        { status: 400 }
      );
    }

    // Validate role is a valid enum value
    if (!isValidRole(role)) {
      return NextResponse.json(
        { message: `Invalid role. Must be one of: ${VALID_ROLES.join(", ")}` },
        { status: 400 }
      );
    }

    // Prevent admin from changing their own role
    if (userId === auth.user.id) {
      return NextResponse.json(
        { message: "You cannot change your own role" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    await prisma.activityLog.create({
      data: {
        userId: auth.user.id,
        action: `UPDATED_ROLE_TO_${role}`,
        details: `Changed role for user ${userId}`,
      },
    });

    return NextResponse.json({
      message: "User role updated",
      user: {
        id: updatedUser.id,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("Update role error:", error);
    return NextResponse.json(
      { message: "Failed to update role" },
      { status: 500 }
    );
  }
}

