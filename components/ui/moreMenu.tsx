import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdMore } from "react-icons/io";

export default function MoreMenu({ children, ...props }: any) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger className="max-w-fit w-full flex items-center justify-center relative focus:!outline-none">
        <IoMdMore size={36} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-[#1A1C1F] text-white p-2 rounded-lg border border-customBorder shadow-lg w-56">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
