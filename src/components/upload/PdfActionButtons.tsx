"use client";

import { Eye, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PdfActionButtons = ({ pdfId }: { pdfId: string }) => {
  const router = useRouter()
  async function handleView() {
    try {
      const res = await fetch(`/api/pdf/${pdfId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch PDF");
      }
      const data = await res.json();
      if (!data.success || !data.data?.url) {
        throw new Error(data.message || "Failed to open PDF");
      }
      window.open(data.data.url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error(error);
      toast.error("Unable to open PDF");
    }
  }
  async function handleChat(){
    try {
      const res = await fetch(`/api/ingest/${pdfId}` , {
        method : "POST",
      })
      if(!res.ok){
        throw new Error("Failed to start ingestion")
      }
      router.push(`/chat/${pdfId}`)
    } catch (error) {
      console.error(error);
      toast.error("Unable to start chat");
    }
  }
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <button
        onClick={handleView}
        className="p-1 rounded-md cursor-pointer hover:bg-gray-100 transition"
      >
        <Eye width={22} height={22} />
      </button>

      <button className="p-1 rounded-md cursor-pointer hover:bg-red-50 text-red-600 transition">
        <Trash width={20} height={20} />
      </button>

      <Button
      onClick={handleChat}
       className="cursor-pointer bg-blue-500"> Chat </Button>
    </div>
  );
};

export default PdfActionButtons;
