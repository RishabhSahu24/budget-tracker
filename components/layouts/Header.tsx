"use client";
import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";

const Header = () => {
  const { user, isSignedIn } = useUser();
  console.log("user", user);
  return (
    <header className="bg-gray-100 h-16 border-b shadow-md">
      <div className="flex h-full px-4 sm:px-6 lg:px-8 items-center justify-between">
        <div className="flex-grow" />
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Link href={"/sign-in"}>
            <Button variant={"secondary"} className="px-12 font-bold text-md">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
