"use server";

import { getUser } from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface PDFData {
  pdfId?: string;
  pdfName?: string;
  pdfKey?: string;
  pdfSize?: number;
}
export async function savePdfToDb({ pdfName, pdfKey, pdfSize }: PDFData) {
  const user = await getUser();
  if (!user)
    return {
      success: false,
      message: "Unauthorized",
    };
  if (!pdfName || !pdfKey || !pdfSize)
    return {
      success: false,
      message: "Missing required fields",
    };
  if (typeof pdfSize !== "number" || pdfSize <= 0) {
    return { success: false, message: "Invalid file size" };
  }
  try {
    const res = await prisma.document.create({
      data: {
        name: pdfName,
        key: pdfKey,
        size: pdfSize,
        userId: user.id,
      },
    });
    if (!res)
      return {
        success: false,
        message: "Failed to save PDF to database",
      };
    revalidatePath("/dashboard");
    return {
      success: true,
      message: "PDF uploaded successfully!",
      data: res,
    };
  } catch (error) {
    console.log("Error saving PDF to database:", error);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
}

import { s3DeleteUrl } from "@/lib/s3";
import { Pinecone } from "@pinecone-database/pinecone";

export async function deletePdfAction(pdfId: string) {
  const user = await getUser();
  if (!user)
    return {
      success: false,
      message: "Unauthorized",
    };

  try {
    const pdf = await prisma.document.findUnique({
      where: {
        id: pdfId,
        userId: user.id,
      },
    });

    if (!pdf)
      return {
        success: false,
        message: "Document not found",
      };

    // 1. Delete from S3
    if (pdf.key) {
      await s3DeleteUrl(pdf.key);
    }

    // 2. Delete from Pinecone
    if (process.env.PINECONE_API_KEY && process.env.PINECONE_INDEX_NAME) {
      const pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
      });
      const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

      // Delete all vectors under this user namespace + pdfId metadata
      await index.namespace(user.id).deleteMany({
        pdfId: pdfId,
      });
    }

    // 3. Delete from Database
    await prisma.document.delete({
      where: {
        id: pdfId,
      },
    });

    revalidatePath("/dashboard");
    return {
      success: true,
      message: "PDF deleted successfully",
    };
  } catch (error) {
    console.log("Error deleting PDF:", error);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
}
