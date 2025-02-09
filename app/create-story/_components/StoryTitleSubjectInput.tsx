"use client";
import React, { useState } from "react";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaMagic, FaCrown } from "react-icons/fa";

const StoryTitleSubjectInput = ({ userSelection }: any) => {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [premium, setPremium] = useState(false); // Toggle Premium (Manual Control)

  // Handle Image Upload
  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
      userSelection({ fieldValue: imageUrl, fieldName: "coverImage" });
    }
  };

  // Handle AI Image Generation (Mock API Call)
  const generateAICover = async () => {
    setLoadingAI(true);
    setTimeout(() => {
      const aiImageUrl = "https://via.placeholder.com/128x192?text=AI+Cover"; // Replace with real AI API
      setCoverImage(aiImageUrl);
      userSelection({ fieldValue: aiImageUrl, fieldName: "coverImage" });
      setLoadingAI(false);
    }, 3000); // Simulated AI generation delay
  };

  return (
    <div className="flex flex-col items-center">
      {/* Title Section */}
      <label className="font-bold text-3xl text-primary text-center">
        1. Title and Subject of the Story
      </label>

      {/* Title Input */}
      <h3 className="font-bold text-xl text-primary mt-5 italic">Title:</h3>
      <Input
        placeholder="Enter the title of the story..."
        size="lg"
        className="mt-4 max-w-md p-3 rounded-lg border border-primary shadow-md"
        onChange={(e) =>
          userSelection({
            fieldValue: e.target.value,
            fieldName: "storyTitle",
          })
        }
      />

      {/* Cover Image Upload (Smaller Book Size) */}
      <h3 className="font-bold text-xl text-primary mt-5 italic">
        Cover Image:
      </h3>
      <motion.label
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex flex-col items-center justify-center w-32 h-48 bg-blue-100 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer mt-4 shadow-md transition-all overflow-hidden"
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        {coverImage ? (
          <img
            src={coverImage}
            alt="Cover Preview"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <FaCloudUploadAlt className="text-blue-500 text-4xl" />
            <p className="text-blue-600 mt-2 text-sm font-semibold">
              Click or Drag to Upload
            </p>
          </motion.div>
        )}
      </motion.label>

      {/* AI Cover Option */}
      <div className="mt-4">
        {premium ? (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Button
              onClick={generateAICover}
              disabled={loadingAI}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold px-5 py-3 rounded-lg shadow-md flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <FaMagic className="text-lg" />
              {loadingAI ? "Generating AI Cover..." : "Generate AI Cover"}
            </Button>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert("Upgrade to Premium for AI Cover Generation!")}
            className="bg-gray-300 text-gray-700 font-semibold px-5 py-3 rounded-lg shadow-md flex items-center gap-3 cursor-pointer hover:bg-gray-400 transition"
          >
            <FaCrown className="text-yellow-500 text-lg" />
            Unlock AI Cover (Premium Only)
          </motion.button>
        )}
      </div>

      {/* Toggle Premium Button (For Testing) */}
      <div className="mt-4">
        <Button
          onClick={() => setPremium(!premium)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {premium ? "Disable Premium" : "Enable Premium"}
        </Button>
      </div>

      {/* Subject Input */}
      <h3 className="font-bold text-xl text-primary mt-5 italic">Subject:</h3>
      <Textarea
        placeholder="Write the subject of the story..."
        size="lg"
        classNames={{
          input:
            "resize-y min-h-[200px] w-full mt-4 p-3 rounded-lg border border-primary shadow-md",
        }}
        className="mt-4 max-w-md"
        onChange={(e) =>
          userSelection({
            fieldValue: e.target.value,
            fieldName: "storySubject",
          })
        }
      />
    </div>
  );
};

export default StoryTitleSubjectInput;
