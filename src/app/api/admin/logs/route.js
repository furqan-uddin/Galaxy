import { authenticate } from "@/lib/auth";
import { authorizeRoles } from "@/lib/authorize";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
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

    // Get query params for pagination and filtering
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const action = searchParams.get("action") || "";
    const skip = (page - 1) * limit;

    // Build where clause for filtering
    const where = action
      ? { action: { contains: action, mode: "insensitive" } }
      : {};

    const [logs, total] = await Promise.all([
      prisma.activityLog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              email: true,
              name: true,
              role: true,
            },
          },
        },
      }),
      prisma.activityLog.count({ where }),
    ]);

    return NextResponse.json({
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Fetch logs error:", error);
    return NextResponse.json(
      { message: "Failed to fetch logs" },
      { status: 500 }
    );
  }
}

