import { useState, useRef, useCallback } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
You are VoteWise AI, an expert assistant on election processes and civic engagement. 
Your goal is to educate users about how elections work in a neutral, informative, and encouraging way.
Key topics: Voter registration, candidate filing, campaigning, polling, counting, and results.
Style: Professional, easy to understand, and structured. 
If a user asks about political opinions or who to vote for, politely decline and steer back to the process.
Format responses using markdown for better readability.
`;

const RATE_LIMIT_MS = 1000;
const MAX_HISTORY_LENGTH = 20;

export const useGemini = (apiKey) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastRequestTime = useRef(0);

  const sendMessage = useCallback(async (prompt, history = []) => {
    if (!apiKey) {
      setError("Please provide a Gemini API Key to use the assistant.");
      return null;
    }

    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime.current;
    if (timeSinceLastRequest < RATE_LIMIT_MS) {
      setError("Please wait a moment before sending another message.");
      return null;
    }
    lastRequestTime.current = now;

    setLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" }
        ]
      });

      const trimmedHistory = history.slice(-MAX_HISTORY_LENGTH);

      const chat = model.startChat({
        history: [
          { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
          { role: "model", parts: [{ text: "Understood. I am VoteWise AI, your electoral process guide. How can I assist you today?" }] },
          ...trimmedHistory
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
          topP: 0.8,
          topK: 40
        }
      });

      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      return response.text();
    } catch (err) {
      console.error("Gemini API Error:", err);
      setError(err.message?.includes('429') 
        ? "Rate limit exceeded. Please wait a moment." 
        : "Failed to get a response. Please check your API key or connection.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  return { sendMessage, loading, error };
};
