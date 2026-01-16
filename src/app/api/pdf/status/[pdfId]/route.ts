import { getUser } from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest , {params} : {params : Promise<{pdfId : string}>}) {
    try {
        // user auth
        const authUser = await getUser()
        if(!authUser) return NextResponse.json({success : false , message : "Unauthorized"},{status : 401})
        // Check whether you receive the pdfId or not
        const pdfId = (await params).pdfId
        if(!pdfId) return NextResponse.json({success : false , message : "PDF_ID not found"},{status : 404})
        // validate the pdf is from the correct requested user 
        const pdf = await prisma.document.findFirst({
            where : { id : pdfId  , userId : authUser.id}
        })
        if(!pdf) return NextResponse.json({success : false , message : "No PDF found"},{status : 404})
        // get the status of the pdf 
        const status = pdf.status
        
        return NextResponse.json({success : true , status : status},{status : 200})
    } catch (error) {
        console.log(`Error occured ` , error)
        return NextResponse.json({success : false , message : error instanceof Error ? error.message : "Internal server error"},{status : 500})
    }
}