"use server";

import { getUser } from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
import { UIMessage as Message } from "@ai-sdk/react";

export async function getChatMessages(
  pdfId: string,
): Promise<{ success: boolean; data?: Message[]; message?: string }> {
  try {
    const user = await getUser();
    if (!user) {
      return { success: false, message: "Unauthorized" };
    }

    const { id: userId } = user;

    const chat = await prisma.chat.findFirst({
      where: { userId, documentId: pdfId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!chat) {
      return { success: true, data: [] };
    }

    const messages: Message[] = chat.messages.map((m) => ({
      id: m.id,
      role: m.role.toLowerCase() as "user" | "assistant",
      content: m.content,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parts: [{ type: "text", text: m.content }] as any,
    }));

    return { success: true, data: messages };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { success: false, message: "Internal Server Error" };
  }
}
