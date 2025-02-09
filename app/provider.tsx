"use client";

import React from "react";
import { HeroUIProvider } from "@heroui/react";
import { ClerkProvider } from "@clerk/nextjs";


const Provider = ({ children }: { children: React.ReactNode }) => {
  const clerkPubKey = "pk_test_ZW5kbGVzcy1idWNrLTcxLmNsZXJrLmFjY291bnRzLmRldiQ"; // Access env var

  if (!clerkPubKey) {
    console.error("Clerk publishable key is missing!"); // Important!
    return <div>Clerk is not initialized. Check your environment variables.</div>; // Or a better fallback
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}> {/* Pass to ClerkProvider */}
      <HeroUIProvider>{children}</HeroUIProvider>
    </ClerkProvider>
  );
};

export default Provider;