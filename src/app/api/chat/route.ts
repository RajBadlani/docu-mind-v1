import { intentRouter } from "@/lib/chat/intentRouter";
import { getUser } from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
import {
  llmIntentClassifier,
  regexIntentClassifier,
} from "@/lib/rag/intentClassifier";
import { NextRequest, NextResponse } from "next/server";

const MAX_DAILY_CHATS = 15;

export async function POST(request: NextRequest) {
  try {
    // Checks the user session and authenticate the user
    const user = await getUser();
    if (!user)
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );

    // Get data from body
    const body = await request.json();
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0)
      return NextResponse.json(
        { success: false, message: "Invalid Request" },
        { status: 400 },
      );

    const lastMessage = messages[messages.length - 1];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const textPart = lastMessage.parts?.find(
      (p: any) => p.type === "text" && typeof p.text === "string",
    );

    if (!textPart) {
      return NextResponse.json(
        { success: false, message: "No text found" },
        { status: 400 },
      );
    }
    const queryMessage = textPart.text;
    const pdfId = lastMessage?.metadata?.pdfId;

    if (!pdfId || typeof pdfId !== "string") {
      return NextResponse.json(
        { success: false, message: "Missing pdfId" },
        { status: 400 },
      );
    }

    // Daily Usage Limit Logic

    const now = new Date();

    let usage = await prisma.usage.findUnique({
      where: { userId: user.id },
    });

    const resetAt = new Date(now);
    resetAt.setDate(resetAt.getDate() + 1);
    resetAt.setHours(0, 0, 0, 0);

    if (!usage) {
      usage = await prisma.usage.create({
        data: {
          userId: user.id,
          chatCount: 0,
          resetAt,
        },
      });
    }

    if (usage.resetAt <= now) {
      usage = await prisma.usage.update({
        where: { userId: user.id },
        data: { chatCount: 0, resetAt },
      });
    }

    if (usage.chatCount >= MAX_DAILY_CHATS) {
      return NextResponse.json(
        {
          success: false,
          message: "Daily chat limit reached. Try again tomorrow.",
        },
        { status: 429 },
      );
    }

    await prisma.usage.update({
      where: { userId: user.id },
      data: { chatCount: { increment: 1 } },
    });

    // Authority check
    const pdf = await prisma.document.findFirst({
      where: { id: pdfId, userId: user.id },
    });
    if (!pdf)
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 },
      );

    console.log(queryMessage);

    let activeChat = await prisma.chat.findFirst({
      where: { userId: user.id, documentId: pdfId },
    });

    if (!activeChat) {
      activeChat = await prisma.chat.create({
        data: {
          userId: user.id,
          documentId: pdfId,
        },
      });
    }

    // Getting the intent of the user
    let intent = "UNKNOWN";
    let intentSource = undefined;

    const regexIntent = regexIntentClassifier(queryMessage);
    let llmIntent = undefined;
    if (!regexIntent?.intent) {
      llmIntent = await llmIntentClassifier(queryMessage);
      intent = llmIntent.intent;
      intentSource = "llm";
    } else {
      intent = regexIntent.intent;
      intentSource = "regex";
    }
    console.log(intentSource, intent);

    await prisma.message.create({
      data: {
        chatId: activeChat.id,
        role: "USER",
        content: queryMessage,
      },
    });

    // Routing to the intent handler
    const result = await intentRouter(intent, queryMessage, {
      userId: user.id,
      pdfId,
      onFinish: async (text: string) => {
        await prisma.message.create({
          data: {
            chatId: activeChat.id,
            role: "ASSISTANT",
            content: text,
          },
        });
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.log(`Error occured`, error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error " },
      { status: 500 },
    );
  }
}
