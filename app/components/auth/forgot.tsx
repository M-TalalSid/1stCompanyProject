"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (!email) {
      setError("Email is required");
      return;
    }

    setIsLoading(true);

    const result = await forgotPassword(email);

    setIsLoading(false);

    if (result.success) {
      setMessage("Password reset email sent");
    } else {
      setMessage(`Error: ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Forgot Password
        </h2>
        <p className="text-center text-gray-500 mb-6">
          We'll send you a link to reset your password
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-3 border rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {message && (
            <p className="text-green-600 text-sm text-center">{message}</p>
          )}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 py-3 text-lg rounded-xl"
            disabled={isLoading}
          >
            {isLoading ? "Sending Email..." : "Reset Password"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/auth-pages/login"
            className="text-rose-600 hover:underline text-sm"
          >
            Back to Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
