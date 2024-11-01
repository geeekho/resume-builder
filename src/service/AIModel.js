import { GoogleGenerativeAI } from "@google/generative-ai";

if (!import.meta.env.VITE_GOOGLE_AI_KEY) {
  throw new Error("VITE_GOOGLE_AI_KEY is not defined");
}

const apiKey = import.meta.env.VITE_GOOGLE_AI_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});
