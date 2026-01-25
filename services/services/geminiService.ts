
import { GoogleGenAI } from "@google/genai";
import { Resource } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getGeminiResponse = async (prompt: string, context?: Resource) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  let systemInstruction = "You are an expert academic librarian and tutor for Sharnbasava University. You help students understand their study materials, summarize chapters, and explain complex concepts from textbooks and notes.";
  
  if (context) {
    systemInstruction += ` You are currently assisting with the resource titled "${context.title}" by ${context.author} in the ${context.department} department. Use this context to provide specific and relevant answers.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The AI assistant is currently unavailable. Please try again later.";
  }
};
