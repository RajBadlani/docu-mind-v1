"use client";

import { MessageCircleHeart } from "lucide-react";
import Link from "next/link";
import OAuthButtons from "./OAuthButton";

const SignUpForm = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <section className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-200 px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <MessageCircleHeart className="text-blue-600" size={28} />
            <h1 className="text-xl font-semibold text-gray-900">DocuMind AI</h1>
          </div>
          <p className="text-sm text-gray-500 text-center">
            Create your account to get started
          </p>
        </div>

        {/* OAuth */}
        <div className="flex flex-col gap-3">
          <OAuthButtons />
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/log-in"
            className="text-blue-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default SignUpForm;
