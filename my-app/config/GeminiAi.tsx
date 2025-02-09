import { GoogleGenerativeAI } from '@google/generative-ai';


console.log('API Key:', process.env.GEMINI_API_KEY);

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: 'user',
      parts: [
        {
          text: 'create kids story on description for 0-12 years kids, educational story and all images in Paper cut style: story of body and magic school, give me 5 chapter, with detailed image text prompot for each of chapter and imgae prompt for story cover book with story name, all in JSON field format',
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: 'Okay, I can help you create a kids\' story about the body and a magic school, formatted as a JSON object with chapter text and image prompts in a paper-cut style.',
        },
      ],
    },
  ],
});