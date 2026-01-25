"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import SignOutButton from "../auth/SignOutButton";
import ChatPanel from "./ChatPanel";

import { UIMessage as Message } from "ai";

// Local interfaces to avoid tight coupling with Prisma
interface User {
  name: string;
  email: string;
  emailVerified: boolean;
  plan: string;
}

interface Document {
  id: string;
  name: string;
  status: string;
  key: string;
}

const ChatPageComponent = ({
  pdf,
  pdfUrl,
  user,
  initialMessages = [],
}: {
  pdf: Document;
  pdfUrl: string;
  user: User;
  initialMessages?: Message[];
}) => {
  return (
    <div className="flex h-full w-full flex-col bg-muted/40">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-gray-200/60 bg-white/70 px-4 py-3 backdrop-blur-md shadow-sm">
        <Link
          href="/dashboard"
          className="group flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 transition hover:bg-blue-100"
        >
          <ChevronLeft className="h-5 w-5 text-blue-700 transition group-hover:-translate-x-0.5" />
        </Link>

        <div className="flex-1 text-center px-2">
          <h1 className="max-w-full truncate text-sm sm:text-base font-semibold text-gray-900">
            {pdf.name}
          </h1>
        </div>

        <SignOutButton user={user} />
      </div>

      {/* Main */}
      <div className="flex-1 min-h-0 overflow-hidden p-3">
        {/* Desktop View */}
        <div className="hidden xl:flex h-full w-full">
          <ResizablePanelGroup
            direction="horizontal"
            className="h-full rounded-xl border bg-background shadow-sm"
          >
            {/* PDF */}
            <ResizablePanel
              defaultSize={40}
              minSize={30}
              className="overflow-hidden"
            >
              <div className="h-full w-full rounded-l-xl bg-muted/20 p-2">
                <iframe
                  src={pdfUrl}
                  className="h-full w-full rounded-lg border bg-white"
                  loading="lazy"
                />
              </div>
            </ResizablePanel>

            <ResizableHandle className="w-1 cursor-col-resize bg-border hover:bg-blue-300/60 transition-colors" />

            {/* Chat */}
            <ResizablePanel
              defaultSize={60}
              minSize={50}
              className="flex min-h-0 flex-col"
            >
              <div className="flex-1 min-h-0 rounded-r-xl bg-background">
                <ChatPanel pdf={pdf} initialMessages={initialMessages} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile View */}
        <div className="xl:hidden h-full flex flex-col">
          <div className="h-full flex flex-col bg-background rounded-lg border">
            <ChatPanel pdf={pdf} initialMessages={initialMessages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPageComponent;
