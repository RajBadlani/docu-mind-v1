"use client";

import { Eye, Trash, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { deletePdfAction } from "@/actions/pdfServerAction";

const PdfActionButtons = ({ pdfId }: { pdfId: string }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  async function handleChat() {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/ingest/${pdfId}`, {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error("Failed to start ingestion");
      }
      router.push(`/chat/${pdfId}`);
    } catch (error) {
      console.error(error);
      toast.error("Unable to start chat");
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const res = await deletePdfAction(pdfId);
      if (res.success) {
        toast.success("PDF deleted successfully");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to delete PDF");
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal Server error");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <button
        onClick={handleView}
        disabled={isDeleting || isLoading}
        className="p-1 rounded-md cursor-pointer hover:bg-gray-100 transition disabled:opacity-50"
      >
        <Eye width={22} height={22} />
      </button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            className="p-1 rounded-md cursor-pointer hover:bg-red-50 text-red-600 transition disabled:opacity-50"
            disabled={isDeleting || isLoading}
          >
            {isDeleting ? (
              <Loader2 className="animate-spin" width={20} height={20} />
            ) : (
              <Trash width={20} height={20} />
            )}
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              document along with any cached data and chat history associated
              with it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting || isLoading}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting || isLoading}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        onClick={handleChat}
        disabled={isDeleting || isLoading}
        className="cursor-pointer bg-blue-500 disabled:opacity-50 min-w-[80px] hover:bg-blue-600 transition"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : "Chat"}
      </Button>
    </div>
  );
};

export default PdfActionButtons;
