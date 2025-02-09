"use client";

import React from "react";
import { HeroUIProvider } from "@heroui/react";
import { ClerkProvider } from "@clerk/nextjs";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <HeroUIProvider>{children}</HeroUIProvider>
    </ClerkProvider>
  );
};

export default Provider;
