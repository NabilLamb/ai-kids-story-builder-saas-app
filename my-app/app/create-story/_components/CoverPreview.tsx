"use client";
import React from 'react';

interface CoverPreviewProps {
  title: string;
  imageUrl: string;
}

export default function CoverPreview({ title, imageUrl }: CoverPreviewProps) {
  return (
    <div className="relative w-full max-w-xl">
      <img
        src={imageUrl}
        alt="Story Cover Preview"
        className="rounded-lg shadow-xl border-2 border-primary"
      />
      <div className="absolute top-4 left-0 right-0 text-center">
        <h2 className="text-4xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          {title}
        </h2>
      </div>
    </div>
  );
}