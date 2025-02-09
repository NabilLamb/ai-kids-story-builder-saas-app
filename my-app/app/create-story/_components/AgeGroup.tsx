"use client";

import React, { useState } from "react";
import Image from "next/image";
import { OptionField } from "./StoryType";

const AgeGroup = ({ userSelection }: any) => {
  const OptionList = [
    {
      label: "0-3 years old",
      imageUrl: "/kid-0-3.png",
      isFree: true,
    },
    {
      label: "4-6 years old",
      imageUrl: "/kid-4-6.png",
      isFree: true,
    },
    {
      label: "7-12 years old",
      imageUrl: "/kid-7-12.png",
      isFree: true,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

  const onUserSelect = (item: OptionField) => {
    setSelectedOption(item.label);
    userSelection({
      fieldValue: item?.label,
      fieldName: "ageGroup",
    });
  };

  return (
    <div>
      <label className="font-bold text-4xl text-primary">3. Age Group</label>
      <div className="grid grid-cols-3 gap-5 mt-3">
        {OptionList.map((item, index) => (
          <div
            key={index}
            className={`relative cursor-pointer p-1 transition-all duration-300 ${
              selectedOption === item.label
                ? "grayscale-0 border-4 border-primary bg-opacity-30 bg-primary rounded-3xl"
                : "grayscale hover:grayscale-0"
            }`}
            onClick={() => onUserSelect(item)}
          >
            <div className="relative">
              <Image
                src={item.imageUrl}
                alt={item.label}
                width={300}
                height={300}
                className="object-cover h-[260px] rounded-3xl"
              />
              <h2 className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white text-center w-40 bg-black bg-opacity-50 text-xs sm:text-sm py-1 px-2 rounded-md">
                {item.label}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgeGroup;