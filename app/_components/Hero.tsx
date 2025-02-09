"use client"
import React from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="px-10 md:px-28 lg:px-44 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
            Welcome to StorySpark-AI
          </h1>
          <p className="text-lg mt-4">
            Create your own stories with the help of AI. Get started by creating
            your own story or exploring stories created by others.
          </p>
          <div className="mt-4">
            <Link href={"/create-story"}>
              <Button
                size="lg"
                className="font-bold bg-primary text-white px-14 py-2 rounded-lg"
              >
                Create Story
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-end">
          <Image
            src={"/hero.png"}
            alt="hero"
            width={560}
            height={400}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
