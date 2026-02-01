"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "ADMIN")) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (!user || user.role !== "ADMIN") return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="space-y-3">
        <Link
          href="/dashboard/admin/users"
          className="block text-blue-600 underline"
        >
          Manage Users
        </Link>

        <Link
          href="/dashboard/admin/logs"
          className="block text-blue-600 underline"
        >
          View Activity Logs
        </Link>
      </div>
    </div>
  );
}
