import "dotenv/config"
import { groq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import z from "zod";

const llmIntentEnum = z.enum([
  "GREETING",
  "DATE_TIME",
  "THANKS",
  "GOODBYE",
  "BOT_INFO",
  "DOC_QUES",
  "DOC_SUMMARY_FULL",
  "DOC_SUMMARY_PAGE",
  "DOC_CONTENT_SUMMARY",
  "UNKNOWN"
]);

type Regex_Intent =
  | "GREETING"
  | "DATE_TIME"
  | "THANKS"
  | "GOODBYE"
  | "BOT_INFO";

type IntentResult = { intent: Regex_Intent | null }; 

export function regexIntentClassifier(query: string): IntentResult | null {
  if (!query) return null;

  const msg = query.trim().toLowerCase();

  if (/\b(and|also|then)\b.*\b(what|why|how|explain|tell|give|show|summarize)\b/.test(msg))
    return {intent : null};

  if (/^(hi|hello|hey|yo|hola|namaste|good\s*(morning|afternoon|evening))[\s,!?.]*$/.test(msg)) 
    return {intent : "GREETING"};
  
  if (/^(thanks|thank\s*you|thx|appreciate|much\s*appreciated)[!.]?$/.test(msg)) 
    return {intent :"THANKS"};

  if (/\b(bye|goodbye|see\s*you|see\s*ya|take\s*care|exit|quit)\b/.test(msg)) 
    return {intent :"GOODBYE"};

  if (/\b(who\s*are\s*you|what\s*are\s*you|about\s*you|your\s*purpose|are\s*you\s*a\s*bot)\b/.test(msg)) 
    return {intent :"BOT_INFO"};

  if (/\b(current\s*(date|time)|what\s*time\s*is\s*it|today'?s\s*date)\b/.test(msg)) 
  return {intent :"DATE_TIME"};

  return {intent :null};
}

export async function llmIntentClassifier(query:string) {
    const {object} = await generateObject({
        model : groq("openai/gpt-oss-20b"),
        
        schema : z.object({
            intent : llmIntentEnum
        }),
        system : `You are a strict intent classifier , who takes the user query
        and classify the intent of it and return valid JSON.

        Your task is to :
        Read the user query
        Classify it into EXACTLY ONE intent from the allowed list
        Output ONLY valid JSON
        Do NOT explain
        Do NOT invent new labels
        
        Classify the user query into one of these allowed intents: 
        GREETING , DATE_TIME , THANKS , GOODBYE , BOT_INFO , DOC_QUES ,DOC_CONTENT_SUMMARY, DOC_SUMMARY_FULL , DOC_SUMMARY_PAGE, UNKNOWN

        Rules : 
          Return UNKNOWN if the input is meaningless, random, or gibberish.
          Return UNKNOWN if the input is too short or incomplete to determine intent.
          Single words like "explain", "summarize", "page", "tell me" → UNKNOWN.
          DOC_SUMMARY_PAGE if specific page numbers are mentioned.
          DOC_CONTENT_SUMMARY: User asks for a summarized explanation of a topic or section, NOT a specific question and NOT the full document.
          DOC_SUMMARY_FULL if the entire document is clearly requested.
          DOC_QUES if there is a clear, complete question.
          DATE_TIME if asking for the current system date or time.
          If greeting or thanks is mixed with another request, ignore greeting/thanks.
          If multiple intents exist, choose the MOST IMPORTANT one.
          If intent is unclear, choose UNKNOWN.
          `
          ,
        prompt: query
    })

    return object
}