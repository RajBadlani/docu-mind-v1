"use client";

import { signUpAction } from "@/actions/authActions";
import { MessageCircleHeart } from "lucide-react";
import { useState, useTransition } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import OAuthButtons from "./OAuthButton";
import { redirect } from "next/navigation";

const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const res = await signUpAction(formData);
      if (!res.success) {
        setError(res.message);
        toast.error(res.message);
      } else {
        toast.success(res.message);
      }
      redirect("/log-in");
    });
  }

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

        {/* Form */}
        <form className="flex flex-col gap-4" action={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <Input
              name="name"
              placeholder="Your name"
              className="h-10 mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="h-10 mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              name="password"
              type="password"
              placeholder="••••••••"
              className="h-10 mt-1"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Min 6 chars, 1 uppercase, 1 lowercase, 1 special character
            </p>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="h-11 mt-2 bg-blue-600 hover:bg-blue-700 transition font-medium cursor-pointer"
          >
            {isPending ? <Spinner /> : "Create Account"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
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
