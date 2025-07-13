import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCN1zrhLQzTjZGwcVqZbTYmiwQYilhgCu8",
});

export async function get_response(prompt: string) {
  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction:
        "You are courage the cowardly dog's computer like in the show. Alwaus respond sarcastly and in a funny way like it does in the show.",
    },
  });

  const response1 = await chat.sendMessage({
    message: prompt,
  });
  console.log("Chat response 1:", response1.text);

  return response1.text;
}
