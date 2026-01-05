import { getUser } from "@/lib/getUser";
import { s3UploadUrl } from "@/lib/s3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    const session = await getUser()
    if(!session) return NextResponse.json({success : false , message : "Unauthorized"},{status : 401})
    try {
        const { pdfName , pdfSize , pdfType} = await request.json();
        if(!pdfName || !pdfSize || !pdfType) return NextResponse.json({success : false , message : "Please provide all details"},{status : 400})
        
        const MAX_FILE_SIZE = 25 * 1024 * 1024;
        if (typeof pdfSize !== "number" || pdfSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: "File too large (max 25MB)" },
        { status: 400 }
      );
        }
        if (!pdfType.startsWith("application/pdf")) {
      return NextResponse.json(
        { success: false, message: "Only PDF files allowed" },
        { status: 400 }
      );
        }

        const updatedName = `${pdfName}-${Date.now()}`
        const { uploadUrl, key } = await s3UploadUrl( session.id ,  updatedName , pdfType);
        return NextResponse.json({success : true , message : "Upload URL generated successfully" , data : { uploadUrl : uploadUrl , key : key}},{status: 201})
    } catch (error) {
        console.error("Error creating upload URL:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
    }
}