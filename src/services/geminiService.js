import { GoogleGenAI } from "@google/genai";

// Leer la clave de API (tu clave que empieza con AQ.)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Inicializamos el nuevo cliente unificado de Google
const ai = new GoogleGenAI({ apiKey });

export const callGeminiAPI = async (prompt) => {
  try {
    // El nuevo SDK utiliza ai.models.generateContent
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash", 
      contents: prompt,
    });

    // IMPORTANTE: En el nuevo SDK, el resultado es una propiedad directa (.text), ya no es una función (.text())
    return response.text;
  } catch (error) {
    console.error("Error con el nuevo SDK oficial de Gemini:", error);
    throw error;
  }
};