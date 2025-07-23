import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

export async function get_response() {
  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction:
        "You are courage the cowardly dog's computer like in the show. Alwaus respond sarcastly and in a funny way like it does in the show.",
    },
  });
  return chat;
}
