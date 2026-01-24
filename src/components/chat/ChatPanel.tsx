"use client";
import { Document } from "@/generated/prisma/client";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Chatbot from "./Chatbot";
import { UIMessage as Message } from "ai";

const ChatPanel = ({
  pdf,
  initialMessages,
}: {
  pdf: Document;
  initialMessages?: Message[];
}) => {
  const [status, setStatus] = useState(pdf.status);
  const prevStatusRef = useRef(pdf.status);

  useEffect(() => {
    if (prevStatusRef.current === "PROCESSING" && status === "COMPLETED") {
      toast.success("PDF is ready for chat!");
    }
    prevStatusRef.current = status;
  }, [status]);

  useEffect(() => {
    if (status !== "PROCESSING") return;
    const interval = setInterval(async () => {
      const res = await fetch(`/api/pdf/status/${pdf.id}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && data.message !== status) {
        setStatus(data.message);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [status, pdf.id]);

  if (status === "PROCESSING") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        <p className="text-sm text-muted-foreground">
          Preparing your document for chat…
        </p>
      </div>
    );
  }
  if (status === "UNSUPPORTED") {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center gap-3">
        <p className="text-sm font-medium">
          This PDF appears to be image-based.
        </p>
        <p className="text-xs text-muted-foreground">
          Upgrade to PRO to chat with scanned documents.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Upgrade to Pro
        </Button>
      </div>
    );
  }
  if (status === "FAILED") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <p className="text-sm text-red-600">Failed to process this document.</p>
        <Button
          variant="outline"
          onClick={async () => {
            await fetch(`/api/ingest/${pdf.id}`, { method: "POST" });
            setStatus("PROCESSING");
          }}
        >
          Retry
        </Button>
      </div>
    );
  }
  if (status === "COMPLETED") {
    return (
      <div className="w-full h-full">
        {" "}
        <Chatbot pdfId={pdf.id} initialMessages={initialMessages} />{" "}
      </div>
    );
  }
};

export default ChatPanel;
