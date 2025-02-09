"use client";
import React, { useState, useEffect } from "react";
import StorySubjectInput from "./_components/StoryTitleSubjectInput";
import StoryType from "./_components/StoryType";
import AgeGroup from "./_components/AgeGroup";
import ImageStyle from "./_components/ImageStyle";
import { Button } from "@heroui/button";
import { chatSession } from "@/config/GeminiAi";
import CustomLoader from "./_components/CustomLoader";
import { fal } from "@fal-ai/client";
import { toast } from "../hooks/use-toast";

const CREATE_STORY_PROMPT = process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT;

fal.config({
  credentials: process.env.NEXT_PUBLIC_FAL_KEY,
});

export interface formDataType {
  storyTitle: string;
  storySubject: string;
  storyType: string;
  imageStyle: string;
  ageGroup: string;
}

const CreateStory = () => {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<formDataType>({
    storyTitle: "",
    storySubject: "",
    storyType: "",
    imageStyle: "",
    ageGroup: "",
  });

  const generateImage = async (prompt: string) => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    if (!process.env.NEXT_PUBLIC_FAL_KEY) {
      toast({
        title: "Error",
        description: "FAL API key is not configured",
        variant: "destructive",
      });
      return;
    }

    setImageLoading(true);
    try {
      const result = await fal.run("fal-ai/flux/dev", {
        input: {
          prompt: prompt,
          seed: Math.floor(Math.random() * 1000000),
          image_size: "landscape_4_3",
          num_images: 1,
        },
      });

      if (result.data.images?.[0]) {
        setCoverImage(result.data.images[0].url);
        toast({
          title: "Success",
          description: "Image generated successfully!",
        });
      }
    } catch (error) {
      console.error("Image generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setImageLoading(false);
    }
  };

  const onHandleSelection = (data: { fieldValue: string; fieldName: string }) => {
    setFormData((prev) => ({
      ...prev,
      [data.fieldName]: data.fieldValue,
    }));
  };

  const validateForm = () => {
    return Object.values(formData).every(field => field.trim() !== "");
  };

  const GenerateStory = async () => {
    if (!validateForm()) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      if (!CREATE_STORY_PROMPT) throw new Error("Missing story prompt configuration");

      const FINAL_PROMPT = CREATE_STORY_PROMPT
        .replace("{title}", formData.storyTitle)
        .replace("{ageGroup}", formData.ageGroup)
        .replace("{storyType}", formData.storyType)
        .replace("{storySubject}", formData.storySubject)
        .replace("{imageStyle}", formData.imageStyle);

      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storyTitle: formData.storyTitle,
          storySubject: formData.storySubject,
          storyType: formData.storyType,
          imageStyle: formData.imageStyle,
          ageGroup: formData.ageGroup
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const storyContent = await response.json();
      
      if (!storyContent?.title || !storyContent?.chapters) {
        throw new Error("Invalid story structure received");
      }

      // Generate cover image using AI-generated prompt
      await generateImage(storyContent.coverImagePrompt);
      
      // Save to database
      const saveResponse = await fetch("/api/save-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: storyContent.title,
          storySubject: formData.storySubject,
          storyType: formData.storyType,
          imageStyle: formData.imageStyle,
          ageGroup: formData.ageGroup,
          coverImage,
          chapters: storyContent.chapters,
          coverImagePrompt: storyContent.coverImagePrompt,
          chapterImages: [] // Initialize empty array for chapter images
        }),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save story to database");
      }

      toast({
        title: "Success",
        description: "Story generated and saved successfully!",
      });

    } catch (error: any) {
      console.error("Story generation error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate story",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 md:px-40">
      <h2 className="font-extrabold text-[70px] text-primary text-center">
        CREATE YOUR STORY
      </h2>
      <p className="text-2xl text-primary text-center">
        Unlock your creativity with AI: Craft stories like never before! Let our
        AI bring your imagination to life, one story at a time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14">
        <StorySubjectInput userSelection={onHandleSelection} />
        <StoryType userSelection={onHandleSelection} />
        <AgeGroup userSelection={onHandleSelection} />
        <ImageStyle userSelection={onHandleSelection} />
      </div>

      <div className="flex justify-end my-10">
        <Button
          color="primary"
          className="p-10 text-2xl"
          onClick={GenerateStory}
          disabled={loading || imageLoading}
        >
          {loading ? "Generating..." : "Generate Story"}
        </Button>
      </div>
      
      <CustomLoader isLoading={loading || imageLoading} />
      
      {coverImage && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Generated Cover Image:</h3>
          <img 
            src={coverImage} 
            alt="Story cover" 
            className="max-w-2xl rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default CreateStory;