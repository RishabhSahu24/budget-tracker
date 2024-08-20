"use client";
import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { RiDownloadCloud2Line, RiDeleteBin6Fill } from "react-icons/ri";
import { FaStar, FaExchangeAlt } from "react-icons/fa";
import { CiCircleInfo, CiStar } from "react-icons/ci";
import dynamic from "next/dynamic";

const MoreMenu = dynamic(() => import("@/components/ui/moreMenu"), {
  ssr: false,
});

const Header = () => {
  const [isStar, setIsStar] = useState<boolean>(false);

  const toggleStar = () => {
    setIsStar((prev: boolean) => !prev);
  };
  return (
    <header className="h-16 flex bg-pink-500 items-center justify-end px-4">
      <div className="flex items-center">
        {isStar ? (
          <FaStar
            size={28}
            fill="yellow"
            className="mr-4"
            onClick={toggleStar}
          />
        ) : (
          <CiStar size={28} className="mr-4" onClick={toggleStar} />
        )}

        <UserButton />
        <MoreMenu>
          <div className="max-h-65 flex flex-col gap-x-2.5 gap-y-1 overflow-y-scroll">
            <div className="flex gap-2 p-2 rounded-lg hover:bg-blue-600 hover:text-white">
              <CiCircleInfo size={22} className="mr-4" />
              <span>Details</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-600 ">
              <FaExchangeAlt size={20} className="mr-4" />
              <span>Switch Project</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-600 ">
              <RiDownloadCloud2Line size={22} className="mr-4" />
              <span>Download CSV</span>
            </div>
            <hr />
            <div className="flex items-center gap-2 p-2 rounded-lg text-red-500 hover:bg-red-600 hover:text-white">
              <RiDeleteBin6Fill size={22} className="mr-4" />
              <span>Delete project</span>
            </div>
          </div>
        </MoreMenu>
      </div>
    </header>
  );
};

export default Header;
