import { groq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { z } from "zod";

export async function extractPageNumbers(query: string) {
  const { object } = await generateObject({
    model: groq("openai/gpt-oss-20b"),
    schema: z.object({
      pages: z.array(z.number()),
    }),
    system: `
    You are a page number extractor.
    Extract page numbers from the user query.
    
    Examples:
    "explain me page 2" -> [2]
    "summarize page 5 and 6" -> [5, 6]
    "p 10" -> [10]
    "read the second page" -> [2] (if clear, otherwise ignore)
    
    Return ONLY valid JSON.
    Do NOT explain.
    Do NOT invent new labels.
    `,
    prompt: query,
  });

  return object;
}
