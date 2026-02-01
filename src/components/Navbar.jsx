"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="w-full bg-black text-white px-6 py-3 flex justify-between items-center">
      <Link href="/" className="font-bold text-lg">
        Galaxy
      </Link>

      <div className="flex gap-4 items-center">
        {!user && (
          <>
            <Link
              href="/login"
              className="hover:underline"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="hover:underline"
            >
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <Link
              href="/dashboard"
              className="hover:underline"
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
