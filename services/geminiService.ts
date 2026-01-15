
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateRoleDescription = async (role: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Gere uma descrição curta e profissional (máximo 300 caracteres) das responsabilidades de segurança para o cargo: ${role}. Foque em eficiência e vigilância.`,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });
    return response.text || "Descrição não disponível.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao gerar descrição por IA.";
  }
};
