import { authenticate } from "@/lib/auth";
import { authorizeRoles } from "@/lib/authorize";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
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

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  await prisma.activityLog.create({
    data: {
      userId: auth.user.id,
      action: `UPDATED_ROLE_TO_${role}`,
    },
  });

  return NextResponse.json({
    message: "User role updated",
    user: {
      id: updatedUser.id,
      role: updatedUser.role,
    },
  });
}
