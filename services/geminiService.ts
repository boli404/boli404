import { GoogleGenAI } from "@google/genai";

// Safely retrieve API key, handling environments where 'process' might be undefined (browser)
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) || '';

// Safely initialize the client only if key is present to avoid immediate crash,
// though standard practice assumes env is valid.
const ai = new GoogleGenAI({ apiKey });

export const generatePhilosophy = async (baseSlogan: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Based on the slogan "${baseSlogan}", generate a short, abstract, and poetic philosophical statement (max 50 words) about the connection of nodes, the emergence of forms from chaos, and digital interconnectedness.
      The tone should be minimalist, futuristic, and slightly mysterious.
      Return ONLY the text.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini generation failed:", error);
    return "In the void where data converges, structure silently manifests itself from the abstract noise.";
  }
};