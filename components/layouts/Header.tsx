import React from "react";
import Heading from "../Heading";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="bg-gray-100 h-16 flex items-center justify-between px-4">
      <div className="flex items-center">
        <Image src={"../logo.svg"} alt={""} height={100} width={100} />
      </div>
      <div className="text-center flex-1">
        <Heading level={1} size="lg" className="text-rose-600">
          Project Tracker Portal
        </Heading>
      </div>
      <div className="flex items-center">
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
