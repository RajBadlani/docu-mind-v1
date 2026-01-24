"use client";

import { MessageCircleHeart } from "lucide-react";
import { useState, useTransition } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import Link from "next/link";
import { signInAction } from "@/actions/authActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import OAuthButtons from "./OAuthButton";

const LogInForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await signInAction(formData);
      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        router.push("/dashboard");
      }
    });
  }
  return (
    <main className="min-h-screen flex items-center justify-center  px-4">
      <section className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100 px-8 py-10 space-y-8">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <MessageCircleHeart
              className="text-blue-600"
              width={28}
              height={28}
            />
            <p className="font-bold text-2xl text-gray-900">DocuChat AI</p>
          </div>
          <p className="text-gray-500 text-sm text-center">
            {" "}
            Welcome back! Please sign in to your account
          </p>
        </div>

        <form
          className="flex flex-col gap-5 w-full max-w-sm"
          action={handleSubmit}
        >
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              name="password"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Spinner className="text-white" />
                <span>Logging in...</span>
              </div>
            ) : (
              "Log In"
            )}
          </Button>
        </form>
        <div className="flex items-center justify-center   gap-2">
          <div className="border border-gray-300 w-15 sm:w-20"></div>
          <span className="text-gray-500 ">Or continue with</span>
          <div className="border border-gray-300 w-15 sm:w-20"></div>
        </div>
        <div className="flex flex-col gap-5 w-full max-w-sm">
          <OAuthButtons />
        </div>

        <div className="flex justify-center items-center gap-2">
          <p className="text-gray-600">Don&apos;t have an account ?</p>
          <Link href={"/sign-up"} className="text-blue-700 font-medium">
            {" "}
            Sign Up
          </Link>
        </div>
      </section>
    </main>
  );
};

export default LogInForm;
