"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await apiRequest("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          token,
          newPassword: password,
        }),
      });

      setSuccess("Password reset successful. Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          Reset Password
        </h1>

        {error && (
          <p className="mb-3 text-sm text-red-600 text-center">
            {error}
          </p>
        )}

        {success && (
          <p className="mb-3 text-sm text-green-600 text-center">
            {success}
          </p>
        )}

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            New Password
          </label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-60"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
