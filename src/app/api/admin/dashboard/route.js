import { authenticate } from "@/lib/auth";
import { authorizeRoles } from "@/lib/authorize";
import { NextResponse } from "next/server";

export async function GET(req) {
  // 1. Authenticate user
  const auth = await authenticate(req);

  if (auth.error) {
    return NextResponse.json(
      { message: auth.error },
      { status: auth.status }
    );
  }

  // 2. Authorize role
  const roleCheck = authorizeRoles(auth.user.role, ["ADMIN"]);

  if (roleCheck.error) {
    return NextResponse.json(
      { message: roleCheck.error },
      { status: roleCheck.status }
    );
  }

  // 3. Admin-only response
  return NextResponse.json({
    message: "Welcome to Admin Dashboard",
    user: auth.user,
  });
}
