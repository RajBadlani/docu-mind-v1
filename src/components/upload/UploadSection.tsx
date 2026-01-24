"use client";

import { CloudUpload } from "lucide-react";
import { Button } from "../ui/button";
import { BorderBeam } from "../ui/border-beam";
import { toast } from "sonner";
import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import { savePdfToDb } from "@/actions/pdfServerAction";

const MAX_FILE_SIZE = 25 * 1024 * 1024;
const MAX_PAGES = 20;

const UploadSection = () => {
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const pdf = e.target.files?.[0];
    console.log(pdf);
    if (!pdf) return;
    e.target.value = "";

    if (pdf.type !== "application/pdf") {
      console.log(`File type issue`);
      toast.error("Only pdf files are allowed");
      return;
    }
    if (pdf.size > MAX_FILE_SIZE) {
      console.log(`File size issue`);
      toast.error("Please upload a file smaller than 25MB");
      setTimeout(
        () => toast.message("Upgrade to PRO to upload larger files"),
        1500,
      );
      return;
    }

    try {
      const arrayBuffer = await pdf.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();

      if (pageCount > MAX_PAGES) {
        toast.error("PDF must not contain more than 20 pages.");
        setTimeout(
          () => toast.message("Upgrade to PRO to upload larger files"),
          1500,
        );
        return;
      }
    } catch (error) {
      console.log(`Error occured `, error);
      toast.error("Failed to read PDF file.");
      return;
    }
    console.log(`File checked`);
    setUploading(true);

    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pdfName: pdf.name,
          pdfSize: pdf.size,
          pdfType: pdf.type,
        }),
      });

      if (response.status === 403) {
        toast.error("Free plan limit reached (3 PDFs).");
        setTimeout(
          () => toast.message("Upgrade to PRO to upload more files"),
          1500,
        );
        setUploading(false);
        return;
      }

      if (!response.ok) throw new Error("Failed to get upload URL");

      const data = await response.json();
      if (!data?.data?.uploadUrl || !data?.data?.key) {
        throw new Error("Invalid upload URL response");
      }

      const uploadPdf = await fetch(data.data.uploadUrl, {
        method: "PUT",
        body: pdf,
        headers: { "Content-Type": pdf.type },
      });
      if (!uploadPdf.ok) {
        throw new Error("Upload failed! Please try again.");
      }

      // Server Action
      const saveResponse = await savePdfToDb({
        pdfName: pdf.name,
        pdfKey: data.data.key,
        pdfSize: pdf.size,
      });
      if (!saveResponse.success) {
        throw new Error(
          saveResponse.message || "Failed to save PDF info to database",
        );
      }
      toast.success(saveResponse.message || "PDF uploaded successfully!");
      setUploading(false);
    } catch (error) {
      console.log("Error during upload:", error);
      toast.error(
        (error as Error).message || "An error occurred during upload.",
      );
      setUploading(false);
    }
  }

  return (
    <section className="relative w-full max-w-5xl mx-auto rounded-xl bg-white/80 backdrop-blur-sm p-4 sm:p-6 shadow-sm border border-gray-100/50">
      <BorderBeam
        size={250}
        duration={12}
        delay={9}
        colorFrom="#3b82f6"
        colorTo="#60a5fa"
        className="opacity-40"
      />
      <label
        htmlFor="pdf-upload"
        className="group relative block cursor-pointer rounded-xl border-2 border-dashed border-gray-200 transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/30 overflow-hidden"
      >
        <div className="absolute inset-0 bg-blue-50/0 group-hover:bg-blue-50/20 transition-colors" />

        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          className="sr-only"
          disabled={uploading}
          onChange={handleFile}
        />

        <div className="flex flex-col items-center justify-center gap-4 p-8 sm:p-12 text-center min-h-[280px]">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-blue-100/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 shadow-sm ring-1 ring-blue-100 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
              <CloudUpload className="h-8 w-8" />
            </div>
          </div>

          <div className="flex flex-col gap-1 z-10">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
              Upload your PDF
            </h2>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">
              Drag & drop your file here or click to browse
            </p>
          </div>

          <Button
            type="button"
            disabled={uploading}
            className="mt-2 rounded-full bg-linear-to-r from-blue-600 to-blue-500 px-8 py-6 text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all"
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading...
              </span>
            ) : (
              "Select PDF File"
            )}
          </Button>

          <div className="mt-4 flex items-center gap-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
            <span>Max 25MB</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>Max 20 Pages</span>
          </div>
        </div>
      </label>
    </section>
  );
};

export default UploadSection;
