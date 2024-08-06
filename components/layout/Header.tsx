import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="bg-white h-16">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <Image src={"../logo.svg"} alt={""} height={100} width={100} />
        <Button variant={"secondary"} className="px-12 font-bold text-md">
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default Header;
