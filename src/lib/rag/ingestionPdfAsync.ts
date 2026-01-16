import { prisma } from "@/lib/prisma";
import { s3GetUrl } from "@/lib/s3";
import { ingestion } from "./ingestion";
import { UnsupportedPdfError } from "../errorClass";

export async function ingestPdfAsync(pdfId: string) {
  const pdf = await prisma.document.findUnique({ where: { id: pdfId } });
  if (!pdf) throw new Error("PDF not found");

  const signedUrl = await s3GetUrl(pdf.key);

  try {
    await ingestion({
      pdfUrl: signedUrl,
      pdfName: pdf.name,
      pdfId: pdf.id,
      userId: pdf.userId,
    });

    await prisma.document.update({
      where: { id: pdfId },
      data: { status: "COMPLETED" },
    });
  } catch (error) {

    if (error instanceof UnsupportedPdfError) {
      await prisma.document.update({
        where: { id: pdfId },
        data: { status: "UNSUPPORTED" },
      });
      return;
    }

    await prisma.document.update({
      where: { id: pdfId },
      data: { status: "FAILED" },
    });
    throw error;
  }
}
