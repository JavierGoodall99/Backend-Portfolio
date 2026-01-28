import { GoogleGenAI } from "@google/genai";
import { PROFILE, PROJECTS, SKILLS, BLOG_POSTS } from '../data';

// Initialize Gemini Client
// Note: In a real production app, you should not expose the API KEY on the client side.
// You would typically use a proxy server. For this portfolio demo, we assume the environment variable is safe enough for personal use or it's a demo key.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are a CLI Assistant for Saidi Hamisi's portfolio website. 
You speak in a concise, technical, and slightly witty "hacker" tone.
You have access to the following data about Saidi:

Profile: ${JSON.stringify(PROFILE)}
Skills: ${JSON.stringify(SKILLS)}
Projects: ${JSON.stringify(PROJECTS.map(p => ({ name: p.name, desc: p.description, tech: p.techStack })))}
Blog Posts: ${JSON.stringify(BLOG_POSTS.map(b => ({ title: b.title, tags: b.tags })))}

Your goal is to answer visitor questions about Saidi's experience, stack, and work.
Keep answers brief (under 100 words) unless asked to elaborate.
If asked about contact info, provide his email.
Use technical jargon where appropriate (e.g., "His latency on that project was...", "He deployed...").
Always return plain text.
`;

export const sendMessageToGemini = async (history: { role: 'user' | 'model'; text: string }[], message: string): Promise<string> => {
  if (!apiKey) {
    return "Error: API_KEY is missing in the environment. Please configure it to chat.";
  }

  try {
    const model = 'gemini-3-flash-preview';
    
    // Construct the conversation history for the context
    // We start a chat session each time for simplicity in this stateless service, 
    // or we could maintain a chat object in the component. 
    // For this implementation, we will use the chat model.
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Connection terminated: No response received.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "System Failure: Unable to connect to neural network. Try again later.";
  }
};
