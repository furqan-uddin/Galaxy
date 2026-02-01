"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid or missing verification token");
        return;
      }

      try {
        await apiRequest("/auth/verify-email", {
          method: "POST",
          body: JSON.stringify({ token }),
        });

        setStatus("success");
        setMessage("Email verified successfully. Redirecting to login...");

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (err) {
        setStatus("error");
        setMessage(err.message);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow text-center">
        {status === "verifying" && (
          <p className="text-gray-700">
            Verifying your email...
          </p>
        )}

        {status === "success" && (
          <p className="text-green-600 font-medium">
            {message}
          </p>
        )}

        {status === "error" && (
          <p className="text-red-600 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
