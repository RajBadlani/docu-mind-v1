"use server"

import { getUser } from "@/lib/getUser";
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

interface PDFData {
    pdfId? : string,
    pdfName? : string,
    pdfKey? : string,
    pdfSize? : number,
}
export async function savePdfToDb({pdfName,pdfKey,pdfSize}:PDFData) {
    const user = await getUser();
    if(!user) return {
        success: false,
        message: "Unauthorized"
    }
    if(!pdfName || !pdfKey || !pdfSize ) return{
        success: false,
        message: "Missing required fields"
    }
        if (typeof pdfSize !== "number" || pdfSize <= 0) {
      return { success: false, message: "Invalid file size" }
    }
    try {
        const res =  await prisma.document.create({
            data : {
                name : pdfName,
                key : pdfKey,
                size : pdfSize,
                userId : user.id
            }
        })
        if(!res) return {
            success: false,
            message: "Failed to save PDF to database"
        }
        revalidatePath("/dashboard")
        return {
            success: true,
            message: "PDF uploaded successfully!",
            data: res
        }
        
    } catch (error) {
        console.log("Error saving PDF to database:", error)
        return {
            success: false,
            message: "Internal Server Error"
        }
    }
}

