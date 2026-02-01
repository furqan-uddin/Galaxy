import { authenticate } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  const auth = await authenticate(req);

  if (auth.error) {
    return NextResponse.json(
      { message: auth.error },
      { status: auth.status }
    );
  }

  return NextResponse.json({
    message: "Authenticated user",
    user: auth.user,
  });
}
