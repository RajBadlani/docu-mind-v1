import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import { buildGenericPrompt } from "./genericPrompts";

export function genericStreamHandler(
  intent: string,
  userMessage: string,
  onFinish?: (text: string) => Promise<void> | void,
) {
  const prompt = buildGenericPrompt(intent, userMessage);

  return streamText({
    model: groq("llama-3.1-8b-instant"),
    system: `
    You are DocuMind, a polite, professional AI assistant.
    Always be concise, friendly, and helpful.
    `,
    prompt,
    onFinish: async (event) => {
      if (onFinish) await onFinish(event.text);
    },
  });
}
