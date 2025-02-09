"use client"
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-cover bg-center relative">
        <Image 
          src="/login.png" 
          alt="login-img" 
          width={600} 
          height={700} 
          objectFit="cover"
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side - SignIn Form */}
      <div className="flex justify-center items-center w-full md:w-1/2 bg-gray-800 py-8 px-4 order-first md:order-last">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-orange-500 mb-6 text-center md:text-left">Sign In</h2>
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: "bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-200 text-white",
                formInput: "bg-gray-700 text-white border border-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500",
                formLabel: "text-gray-400",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
