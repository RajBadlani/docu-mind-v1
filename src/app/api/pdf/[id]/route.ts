import { getUser } from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
import { s3GetUrl } from "@/lib/s3";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request : NextRequest , {params} : {params : Promise<{id : string}>}) {
    try {
        const user = await getUser();
        if (!user) {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
        }
        const pdfId = (await params).id
        if(!pdfId){
            return NextResponse.json(
        { success: false, message: "PDF id missing" },
        { status: 400 }
      );
        }
        const pdf = await prisma.document.findUnique({ where : {id : pdfId}})
        if(!pdf){
            return NextResponse.json(
        { success: false, message: "PDF not found" },
        { status: 404 }
      );
        }

        if( pdf.userId !== user.id){
            return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
        }

        const signedUrl = await s3GetUrl(pdf.key)
        
        return NextResponse.json({
        success: true,
        message : "Got the url",
        data: {
            url: signedUrl,
            expiresIn: 300,
        },
        });

    } catch (error) {
        console.error("Error generating view URL:", error);
        return NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
        );
    }
}