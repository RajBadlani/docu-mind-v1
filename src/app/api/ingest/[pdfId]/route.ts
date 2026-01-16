import { getUser } from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
import { ingestPdfAsync } from "@/lib/rag/ingestionPdfAsync";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest , {params} : {params : Promise<{pdfId : string}>}) {
    try {
        const user = await getUser();
            if(!user) return NextResponse.json( {
                success: false,
                message: "Unauthorized"
            },{status : 401})

            const pdfId = (await params).pdfId
            if(!pdfId){
                return NextResponse.json(
                { success: false, message: "PDF id missing" },
                { status: 400 }
                );
            }

            const pdf = await prisma.document.findUnique({where  : { id : pdfId}})
            if(!pdf) return NextResponse.json( {
                success :false,
                message : " PDF  not found"
            },{status : 404})

            if (pdf.userId !== user.id) {
            return NextResponse.json(
                { success: false, message: "Forbidden" },
                { status: 403 }
            );
            }
        
            if (pdf.status === "COMPLETED" || pdf.status === "PROCESSING") {
            return NextResponse.json({
                success: true,
                status: pdf.status,
            });
            }
            await prisma.document.update({
                where: { id: pdfId },
                data: { status: "PROCESSING" },
            });
            ingestPdfAsync(pdfId).catch(async (err) => {
                console.error("Ingestion failed:", err);
                await prisma.document.update({
                where: { id: pdfId },
                data: { status: "FAILED" },
            });
            });
            return NextResponse.json({
                success: true,
                status: "PROCESSING",
            });
    } catch (error) {
        console.log(`Error occured ` , error)
        return NextResponse.json({
            success : false,
            message : error instanceof Error ? error.message : "Internal Server Error"
        })
    }
}