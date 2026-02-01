import { authenticate } from "@/lib/auth";
import { authorizeRoles } from "@/lib/authorize";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
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

  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          email: true,
          role: true,
        },
      },
    },
  });

  return NextResponse.json({ logs });
}
