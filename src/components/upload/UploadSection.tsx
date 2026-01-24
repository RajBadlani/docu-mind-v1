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
    <section className="relative w-full max-w-5xl mx-auto mt-4 rounded-xl bg-white p-4 sm:p-5 shadow-sm">
      <BorderBeam
        size={250}
        duration={10}
        delay={3}
        colorFrom="blue"
        colorTo="blue"
      />
      <label
        htmlFor="pdf-upload"
        className="group block cursor-pointer rounded-xl border-2 border-dashed border-gray-300 transition-all hover:border-blue-500 hover:bg-blue-50/40"
      >
        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          className="sr-only"
          disabled={uploading}
          onChange={handleFile}
        />

        <div className="flex flex-col items-center justify-center gap-3 p-6 sm:p-8 text-center min-h-65">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition-transform group-hover:scale-105">
            <CloudUpload className="h-7 w-7" />
          </div>

          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            Upload your PDF
          </h2>

          <p className="text-sm text-gray-600 max-w-xs">
            Drag & drop your file here or click below to browse
          </p>

          <Button
            type="button"
            disabled={uploading}
            className="mt-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium hover:bg-blue-700"
          >
            {uploading ? "Uploading..." : "Browse Files"}
          </Button>

          <div className="mt-3 flex flex-col gap-1 text-xs text-gray-500">
            <span>
              Max file size: <strong>25MB</strong>
            </span>
            <span>
              Max pages: <strong>20 pages</strong>
            </span>
          </div>
        </div>
      </label>
    </section>
  );
};

export default UploadSection;
