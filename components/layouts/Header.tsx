"use client";
import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { RiDownloadCloud2Line, RiDeleteBin6Fill } from "react-icons/ri";
import { FaRegCopy } from "react-icons/fa6";
import MoreMenu from "@/components/ui/moreMenu";
import { FaStar } from "react-icons/fa";

import { CiCircleInfo, CiStar } from "react-icons/ci";

const Header = () => {
  const [isStar, setIsStar] = useState<boolean>(false);

  const toggleStar = () => {
    setIsStar((prev: boolean) => !prev);
  };
  return (
    <header className="h-16 flex items-center justify-end px-4">
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
              <FaRegCopy size={20} className="mr-4" />
              <span>Make a copy</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-600 ">
              <RiDownloadCloud2Line size={22} className="mr-4" />
              <span>Download CSV</span>
            </div>
            <hr />
            <div className="flex items-center gap-2 p-2 rounded-lg text-red-500 hover:bg-red-600 hover:text-white">
              <RiDeleteBin6Fill size={22} className="mr-4" />
              <span>Delete list</span>
            </div>
          </div>
        </MoreMenu>
      </div>
    </header>
  );
};

export default Header;
