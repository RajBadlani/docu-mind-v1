import { getAllChunks } from "@/lib/rag/retriever";
import { streamText } from "ai";
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

  if (!chunks.length) {
    return streamText({
      model: groq("openai/gpt-oss-120b"),
      prompt: "No content was found for this document. Respond politely.",
    });
  }

  // ⚠️ naive truncation safeguard
  const MAX_CHARS = 60_000;

  const combined = chunks
    .map((c) => c.content)
    .join("\n\n")
    .slice(0, MAX_CHARS);

  return streamText({
    model: groq("openai/gpt-oss-120b"),
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
${combined}

Summarize the document clearly:
`,
    onFinish: async (event) => {
      if (onFinish) await onFinish(event.text);
    },
  });
}
