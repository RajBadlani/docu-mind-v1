import { getAllChunks } from "@/lib/rag/retriever";
import { streamText, generateText } from "ai";
import { groq } from "@ai-sdk/groq";

export async function docFullSummaryHandler({
  userId,
  pdfId,
  onFinish,
}: {
  userId: string;
  pdfId: string;
  onFinish?: (text: string) => Promise<void> | void;
}) {
  const chunks = await getAllChunks({ userId, pdfId });
  const MODEL_NAME = "meta-llama/llama-4-scout-17b-16e-instruct";

  if (!chunks.length) {
    return streamText({
      model: groq(MODEL_NAME),
      prompt: "No content was found for this document. Respond politely.",
    });
  }

  // Combine all content
  const fullContent = chunks.map((c) => c.content).join("\n\n");

  return streamText({
    model: groq(MODEL_NAME),
    system: `
You are summarizing an entire document.

Produce:
• high-level overview
• key topics
• important facts
• structured bullet points

Do NOT hallucinate.
`,
    prompt: `
DOCUMENT CONTENT:
${fullContent}

Summarize the document clearly:
`,
    onFinish: async (event) => {
      if (onFinish) await onFinish(event.text);
    },
  });
}
