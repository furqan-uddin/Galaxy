import { authenticate } from "@/lib/auth";
import { authorizeRoles } from "@/lib/authorize";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  // 1. Authenticate
  const auth = await authenticate(req);
  if (auth.error) {
    return NextResponse.json(
      { message: auth.error },
      { status: auth.status }
    );
  }

  // 2. Authorize Admin
  const roleCheck = authorizeRoles(auth.user.role, ["ADMIN"]);
  if (roleCheck.error) {
    return NextResponse.json(
      { message: roleCheck.error },
      { status: roleCheck.status }
    );
  }

  // 3. Fetch users
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isEmailVerified: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ users });
}
