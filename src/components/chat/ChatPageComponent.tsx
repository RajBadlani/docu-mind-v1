"use client";
import { User, Document } from "@/generated/prisma/client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import SignOutButton from "../auth/SignOutButton";
import ChatPanel from "./ChatPanel";

const ChatPageComponent = ({
  pdf,
  pdfUrl,
  user,
}: {
  pdf: Document;
  pdfUrl: string;
  user: User;
}) => {
  return (
    <div className="flex h-screen w-full flex-col bg-muted/40">
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

        <div className="flex items-center">
          <SignOutButton user={user} />
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-3">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full rounded-xl border  bg-background shadow-sm"
        >
          <ResizablePanel
            defaultSize={40}
            minSize={30}
            className="hidden lg:block overflow-hidden"
          >
            <div className="h-full w-full rounded-l-xl bg-muted/20 p-2">
              <iframe
                src={pdfUrl}
                className="h-full w-full rounded-lg border bg-white"
                loading="lazy"
              
              />
            </div>
          </ResizablePanel>

          <ResizableHandle
            className="
              w-1 bg-border
              hover:bg-blue-300/60
              transition-colors
              cursor-col-resize
            "
          />

          {/* Chat Panel */}
          <ResizablePanel
            defaultSize={60}
            minSize={50}
            className="flex flex-col"
          >
            <div className="flex-1 rounded-r-xl bg-background p-4">
              {/* ChatbotComponent goes here */}
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Chat panel
                <ChatPanel pdf={pdf}/>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ChatPageComponent;
