import { getPageChunks } from "@/lib/rag/retriever";
import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";

export async function docPageSummaryHandler({
  query,
  userId,
  pdfId,
  pages,
  onFinish,
}: {
  query: string;
  userId: string;
  pdfId: string;
  pages: number[];
  onFinish?: (text: string) => Promise<void> | void;
}) {
  const chunks = await getPageChunks({
    userId,
    pdfId,
    pages,
  });

  if (chunks.length === 0) {
    return streamText({
      model: groq("openai/gpt-oss-120b"),
      prompt:
        "The requested pages were not found in the document. Reply politely.",
    });
  }

  const context = chunks.map((c) => c.content).join("\n\n");

  // 2️⃣ stream summary
  return streamText({
    model: groq("openai/gpt-oss-120b"),
    system: `
    You summarize ONLY the provided document pages.
    Do not invent facts.
    Be concise but thorough and little bit detailed.
`,
    prompt: `
    Summarize these pages:

${context}
`,
    onFinish: async (event) => {
      if (onFinish) await onFinish(event.text);
    },
  });
}
