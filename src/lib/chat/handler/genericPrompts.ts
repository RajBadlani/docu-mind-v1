import { similaritySearch } from "@/lib/rag/retriever";

export function buildGenericPrompt(intent: string, userMessage: string) {
  switch (intent) {
    case "GREETING":
      return `
    The user greeted you with: "${userMessage}"
    Respond with a friendly, natural greeting.
    Keep it short.
    Do not ask multiple questions.
    Do not mention documents unless asked.
`;
    case "THANKS":
      return `
    The user said: "${userMessage}"
    Respond politely and briefly.
    Do not ask a follow-up question unless it feels natural.
`;

    case "GOODBYE":
      return `
    The user wants to end the conversation.
    Respond with a warm, polite goodbye.
    Do not ask questions.
`;

    case "BOT_INFO":
      return`
    The user is asking who you are.
    Explain briefly that you are an AI assistant that helps users understand their documents.
    Keep it concise and friendly.
`;

    case "DATE_TIME":
        const date = new Date();
      return `
    The user is asking for the current date or time.
    Here is the current date and time: ${date.toDateString()} ${date.toTimeString()}.
    Respond clearly with the correct date and/or time.
    Do not add any extra commentary.
`;
  
    default:
      return `
    The user said: "${userMessage}"
    Respond helpfully and politely.
`;
  }
}
