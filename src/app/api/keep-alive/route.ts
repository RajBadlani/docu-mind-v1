import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Lightweight query to keep the connection alive
    // This wakes up Neon if it's suspended
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      { success: true, message: "Neon DB is alive" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Keep-alive failed:", error);
    return NextResponse.json(
      { success: false, message: "Keep-alive failed" },
      { status: 500 },
    );
  }
}
