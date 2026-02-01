"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await apiRequest("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      setSuccess(
        "If this email is registered, a reset password link has been sent."
      );
      setEmail("");
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
          Forgot Password
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

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-60"
        >
          {loading ? "Sending link..." : "Send reset link"}
        </button>

        <div className="mt-4 text-sm text-center">
          <a
            href="/login"
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </a>
        </div>
      </form>
    </div>
  );
}
