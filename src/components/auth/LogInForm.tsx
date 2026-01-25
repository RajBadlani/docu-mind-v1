"use client";

import { MessageCircleHeart } from "lucide-react";
import Link from "next/link";
import OAuthButtons from "./OAuthButton";

const LogInForm = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
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
