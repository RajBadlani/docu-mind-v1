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

  // Combine all content first to check size
  const fullContent = chunks.map((c) => c.content).join("\n\n");

  // Approximate token count (4 chars ~ 1 token)
  // Limit for single pass ~24k chars (approx 6k tokens, leaving safe room for output)
  const SINGLE_PASS_LIMIT = 24_000;

  if (fullContent.length <= SINGLE_PASS_LIMIT) {
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

  // --- Large Document Strategy: Map-Reduce ---

  // 1. Chunk content into safe batches
  const batches: string[] = [];
  let currentBatch = "";
  const BATCH_SIZE = 20_000; // ~5k tokens

  for (const chunk of chunks) {
    if ((currentBatch + chunk.content).length > BATCH_SIZE) {
      batches.push(currentBatch);
      currentBatch = chunk.content;
    } else {
      currentBatch += (currentBatch ? "\n\n" : "") + chunk.content;
    }
  }
  if (currentBatch) batches.push(currentBatch);

  // 2. Summarize each batch in parallel (Section Summaries)
  // We process in parallel. If rate limits occur, we might need P-Limit,
  // but typically for 3-5 sections it's fine.
  const summaryPromises = batches.map((batch, index) =>
    generateText({
      model: groq(MODEL_NAME),
      system:
        "You are an expert summarizer. Summarize the provided document section concisely, preserving crucial details, figures, and key arguments.",
      prompt: `
SECTION ${index + 1}:
${batch}

Detailed Section Summary:
`,
    }),
  );

  const sectionSummaries = await Promise.all(summaryPromises);
  const combinedSummaries = sectionSummaries
    .map((s, i) => `[Section ${i + 1} Summary]: ${s.text}`)
    .join("\n\n");

  // 3. Final Summary Stream
  return streamText({
    model: groq(MODEL_NAME),
    system: `
You are generating a comprehensive document summary based on summaries of its sections.
Combine the provided section summaries into a coherent, structured, single-document summary.
Ensure flow and continuity.

Structure:
• Executive Summary
• Key Findings/Topics
• Detailed Breakdown
• Conclusion
`,
    prompt: `
SECTION SUMMARIES:
${combinedSummaries}

Generate the final documind summary:
`,
    onFinish: async (event) => {
      if (onFinish) await onFinish(event.text);
    },
  });
}
