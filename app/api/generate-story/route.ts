import { NextResponse } from 'next/server';
import { chatSession } from '../../../config/GeminiAi';

interface Chapter {
  title: string;
  content: string;
  imagePrompt: string;
}

interface StoryData {
  title: string;
  coverImagePrompt: string;
  chapters: Chapter[];
}

const validateStoryData = (data: any): data is StoryData => {
  if (!data?.title || !data?.coverImagePrompt) return false;
  if (!Array.isArray(data.chapters) || data.chapters.length !== 5) return false;
  return data.chapters.every((chap: any) => 
    chap.title && chap.content && chap.imagePrompt
  );
};

export async function POST(request: Request) {
  try {
    const { storyTitle, storySubject, storyType, imageStyle, ageGroup } = await request.json();

    // Validate input
    const missingFields = [];
    if (!storyTitle) missingFields.push("storyTitle");
    if (!storySubject) missingFields.push("storySubject");
    if (!storyType) missingFields.push("storyType");
    if (!imageStyle) missingFields.push("imageStyle");
    if (!ageGroup) missingFields.push("ageGroup");

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const prompt = `Create a children's story titled "${storyTitle}" for ${ageGroup}-year-olds.
      Genre: ${storyType}
      Theme: ${storySubject}
      Style: ${imageStyle}
      Include:
      - Title
      - Cover image description that MUST include the title in large text at top center
      - 5 chapters with title, content, and image descriptions
      Return valid JSON format with the following structure:
      {
        "title": "Story Title",
        "coverImagePrompt": "Detailed cover image description...",
        "chapters": [
          {
            "title": "Chapter 1 Title",
            "content": "Chapter content...",
            "imagePrompt": "Image description..."
          },
          // ...4 more chapters
        ]
      }`;

    const result = await chatSession.sendMessage(prompt);
    const rawResponse = result.response.text();

    // Clean and parse response
    const jsonString = rawResponse.replace(/```json|```/g, '');
    const storyData = JSON.parse(jsonString);

    if (!validateStoryData(storyData)) {
      return NextResponse.json(
        { error: "Invalid story structure generated" },
        { status: 500 }
      );
    }

    return NextResponse.json(storyData);

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate story" },
      { status: 500 }
    );
  }
}