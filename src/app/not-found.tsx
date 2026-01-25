import Link from "next/link";
import { ShinyButton } from "@/components/ui/shiny-button";
import { MessageCircleHeart } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-white px-4 py-12 text-center sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10">
        <div className="h-64 w-64 bg-blue-100 rounded-full blur-[100px] opacity-60" />
        <div className="absolute top-0 right-0 h-48 w-48 bg-cyan-100 rounded-full blur-[80px] opacity-60" />
      </div>

      <div className="mx-auto max-w-md space-y-8 bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-2xl shadow-blue-500/10 ring-1 ring-black/5">
        <div className="flex justify-center">
          <div className="p-4 bg-blue-50 rounded-full">
            <MessageCircleHeart className="h-12 w-12 text-blue-600" />
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            404
          </h1>
          <p className="mt-2 text-xl font-medium text-gray-900">
            Page not found
          </p>
          <p className="mt-4 text-base text-gray-500">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
        </div>

        <div className="flex justify-center">
          <Link href="/">
            <ShinyButton className="bg-blue-600 text-white shadow-lg shadow-blue-500/20 px-8 py-3 rounded-xl">
              Go back home
            </ShinyButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
