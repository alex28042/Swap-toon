import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize only if key exists to avoid runtime crashes in dev
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getMarketInsight = async (fromSymbol: string, toSymbol: string): Promise<string> => {
  if (!ai) {
    return "Conecta tu API Key para ver consejos inteligentes de IA.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Give me a very short, fun, 1-sentence fact or "vibe check" about swapping ${fromSymbol} to ${toSymbol}. Keep it lighthearted and safe. Return ONLY the sentence in Spanish.`,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching Gemini insight:", error);
    return "¡El mercado se ve interesante hoy!";
  }
};
