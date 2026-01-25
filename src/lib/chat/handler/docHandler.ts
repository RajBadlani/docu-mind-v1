import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import { similaritySearch } from "@/lib/rag/retriever";

export async function docQuestionHandler({
  query,
  userId,
  pdfId,
  onFinish,
}: {
  query: string;
  userId: string;
  pdfId: string;
  onFinish?: (text: string) => Promise<void> | void;
}) {
  // Expand the query to improve retrieval
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { expandQuery } = require("@/lib/rag/queryExpander");

  let searchQuery = query;
  // Only expand if the query is relatively short to add context
  if (query.length < 100) {
    const expandedPart = await expandQuery(query);
    searchQuery = `${query} ${expandedPart}`;
  }

  const chunks = await similaritySearch({
    query: searchQuery,
    userId,
    pdfId,
    topK: 5,
  });

  const context = chunks
    .map((c, i) => `SOURCE ${i + 1}:\n${c.content}`)
    .join("\n\n");

  return streamText({
    model: groq("openai/gpt-oss-120b"),
    system: `
    You are a helpful AI assistant answering questions ONLY
    from the provided document context.
    If the answer is not contained in the context, say so clearly. PDF does not contain the answer.
`,
    prompt: `
    DOCUMENT CONTEXT:
    ${context}

    USER QUESTION:
    ${query}
`,
    onFinish: async (event) => {
      if (onFinish) await onFinish(event.text);
    },
  });
}
