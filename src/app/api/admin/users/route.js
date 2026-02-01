import { authenticate } from "@/lib/auth";
import { authorizeRoles } from "@/lib/authorize";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { NextResponse } from "next/server";

// Valid roles for validation
const VALID_ROLES = ["ADMIN", "USER", "MANAGER"];

export async function GET(req) {
  try {
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

    // 3. Get query params for search and pagination
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // 4. Build where clause for search
    const where = search
      ? {
        OR: [
          { email: { contains: search, mode: "insensitive" } },
          { name: { contains: search, mode: "insensitive" } },
        ],
      }
      : {};

    // 5. Fetch users with pagination
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isEmailVerified: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Fetch users error:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST: Admin create new user
export async function POST(req) {
  try {
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

    // 3. Get request body
    const { name, email, password, role } = await req.json();

    // 4. Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // 5. Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // 6. Validate role if provided
    const userRole = role || "USER";
    if (!VALID_ROLES.includes(userRole)) {
      return NextResponse.json(
        { message: `Invalid role. Must be one of: ${VALID_ROLES.join(", ")}` },
        { status: 400 }
      );
    }

    // 7. Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // 8. Hash password
    const hashedPassword = await hashPassword(password);

    // 9. Create user (email verified by admin)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: userRole,
        isEmailVerified: true, // Admin-created users are pre-verified
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    // 10. Log activity
    await prisma.activityLog.create({
      data: {
        userId: auth.user.id,
        action: `CREATED_USER_${user.email}`,
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}

