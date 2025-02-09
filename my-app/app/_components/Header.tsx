"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const MenuList = [
    { name: "Home", url: "/" },
    { name: "Create Story", url: "/create-story" },
    { name: "Explore Stories", url: "/explore" },
    { name: "Contact Us", url: "/contact-us" },
  ];

  return (
    <Navbar maxWidth="full" className="flex items-center justify-between p-2 sm:p-4">
      {/* Left Side - Dropdown Menu Toggle */}
      <NavbarMenuToggle 
        aria-label="Toggle Menu" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="sm:hidden"
      />

      {/* Center - Logo & Brand Name */}
      <NavbarContent className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
        <div className="relative">
          <Image 
            src="/logo.svg" 
            alt="logo" 
            width={0}
            height={0}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
        </div>
        <h2 className="font-bold text-xl sm:text-2xl md:text-3xl text-primary">
          StorySpark-AI
        </h2>
      </NavbarContent>

      {/* Desktop Menu Items */}
      <NavbarContent className="hidden md:flex items-center space-x-6">
        {MenuList.map((item, index) => (
          <NavbarItem key={index}>
            <Link href={item.url} className="text-primary hover:text-primary/80 font-bold">
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right Side - Get Started Button */}
      <NavbarContent justify="end">
        <Button color="primary" className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base">
          Get Started
        </Button>
      </NavbarContent>

      {/* Mobile Dropdown Menu */}
      <NavbarMenu className={`${isMenuOpen ? "block" : "hidden"} md:hidden absolute top-16 left-0 w-full bg-white shadow-lg`}>
        {MenuList.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link 
              href={item.url} 
              className="block w-full text-center py-3 text-primary hover:bg-primary/10"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
