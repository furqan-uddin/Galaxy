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

  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  await prisma.activityLog.create({
    data: {
      userId: auth.user.id,
      action: "DELETED_USER",
    },
  });

  return NextResponse.json({
    message: "User deleted successfully",
  });
}
