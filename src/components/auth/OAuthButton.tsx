"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner"; 

export default function OAuthButtons() {
  const [loadingProvider, setLoadingProvider] = useState<null | "google" | "github">(null);

  const handleOAuthLogin = async (provider: "google" | "github") => {
    try {
      setLoadingProvider(provider);
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
      
    } catch (err) {
      console.error("OAuth error:", err);
      setLoadingProvider(null);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-sm">
      <Button
        onClick={() => handleOAuthLogin("google")}
        disabled={loadingProvider === "google"}
        className="flex items-center justify-center gap-2 bg-white border text-gray-800 hover:bg-gray-100"
      >
        {loadingProvider === "google" ? (
          <Spinner /> 
        ) : (
          <Image src="/google.png" alt="google" width={20} height={20} />
        )}
        Continue with Google
      </Button>

      <Button
        onClick={() => handleOAuthLogin("github")}
        disabled={loadingProvider === "github"}
        className="flex items-center justify-center gap-2 bg-white border text-gray-800 hover:bg-gray-100"
      >
        {loadingProvider === "github" ? (
          <Spinner />
        ) : (
          <Image src="/github.png" alt="github" width={20} height={20} />
        )}
        Continue with GitHub
      </Button>
    </div>
  );
}
