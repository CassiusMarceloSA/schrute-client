import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
