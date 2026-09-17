const { GoogleGenAI } = require('@google/genai');

let aiClient = null;

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }

  if (!aiClient) {
    try {
      aiClient = new GoogleGenAI({ apiKey });
    } catch (err) {
      console.error('[Gemini] Failed to initialize GoogleGenAI client:', err.message);
      return null;
    }
  }

  return aiClient;
};

const DEFAULT_GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.7-flash';

module.exports = {
  getGeminiClient,
  DEFAULT_GEMINI_MODEL,
};
