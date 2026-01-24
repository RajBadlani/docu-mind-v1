import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";

export async function expandQuery(query: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: groq("openai/gpt-oss-120b"),
      system:
        "You are a helpful expert in query expansion and information retrieval.",
      prompt: `
        You are an AI assistant. Your goal is to generate 3 different versions of the given user query to improve document retrieval. 
        Focus on generating synonyms, related questions, and a hypothetical answer to the question.
        Return ONLY the expanded queries separated by spaces. Do not return any other text.
        
        Original Query: ${query}
      `,
    });
    return text.trim();
  } catch (error) {
    console.error("Query expansion failed:", error);
    return query; // Fallback to original query
  }
}
