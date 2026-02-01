"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle,CardDescription } from "@/components/ui/card";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("verifying"); // verifying, success, error, expired
  const [message, setMessage] = useState("");

  // For resend functionality
  const [email, setEmail] = useState("");
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid or missing verification token");
        return;
      }

      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
          // Check if it's an expired token error
          if (data.message?.includes("expired") || data.message?.includes("Invalid")) {
            setStatus("expired");
            setMessage("Your verification link has expired or is invalid.");
          } else {
            setStatus("error");
            setMessage(data.message || "Verification failed");
          }
          return;
        }

        setStatus("success");
        setMessage("Email verified successfully! Redirecting to login...");

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (err) {
        setStatus("error");
        setMessage(err.message || "Something went wrong");
      }
    };

    verifyEmail();
  }, [token, router]);

  const handleResendVerification = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setResending(true);

    try {
      const res = await fetch("/api/auth/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("Verification email sent! Please check your inbox.");
      setStatus("sent");
      setMessage("A new verification email has been sent to " + email);
    } catch (err) {
      toast.error(err?.message || "Failed to send verification email");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="w-full">
      <Card className="w-full shadow-lg border-t-4 border-t-primary">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
              Step 2 of 2
            </span>
          </div>
          <CardTitle className="text-center text-2xl font-bold">Email Verification</CardTitle>
          <CardDescription className="text-center">
            Verify your identity to secure your account
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {/* Verifying State */}
          {status === "verifying" && (
            <div className="py-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Verifying your email...</p>
            </div>
          )}

          {/* Success State */}
          {status === "success" && (
            <div className="py-8">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <p className="text-green-600 font-medium">{message}</p>
            </div>
          )}

          {/* Sent State */}
          {status === "sent" && (
            <div className="py-8">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📧</span>
              </div>
              <p className="text-blue-600 font-medium">{message}</p>
              <p className="text-sm text-gray-500 mt-2">
                Please check your inbox and spam folder.
              </p>
            </div>
          )}

          {/* Error State */}
          {status === "error" && (
            <div className="py-8">
              <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✕</span>
              </div>
              <p className="text-red-600 font-medium">{message}</p>
              <Link href="/login">
                <Button variant="outline" className="mt-4">
                  Back to Login
                </Button>
              </Link>
            </div>
          )}

          {/* Expired State - Show resend form */}
          {status === "expired" && (
            <div className="py-4 space-y-4">
              <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚠️</span>
              </div>
              <p className="text-yellow-700 font-medium">{message}</p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
                <p className="text-sm text-yellow-800 mb-3">
                  Enter your email address to receive a new verification link:
                </p>
                <form onSubmit={handleResendVerification} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" disabled={resending} className="w-full">
                    {resending ? "Sending..." : "Send New Verification Link"}
                  </Button>
                </form>
              </div>

              <Link href="/login">
                <Button variant="ghost" className="mt-2">
                  Back to Login
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
