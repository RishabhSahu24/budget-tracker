import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CiViewTable } from "react-icons/ci";
import { HomeIcon } from "@radix-ui/react-icons";
import { Cross2Icon } from "@radix-ui/react-icons";

interface ViewsFilterProps {
  onSelect: any;
}

const ViewsFilter: React.FC<ViewsFilterProps> = ({ onSelect }) => {
  return (
    <Select defaultValue="all" onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="All items" />
      </SelectTrigger>
      <SelectContent className="w-[300px] p-0 rounded-md bg-[#1A1C1F] text-white order border-customBorder shadow-lg ">
        {/* Header with Views text and a close button */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-600">
          <span className="text-sm font-semibold">Views</span>
          <button
            onClick={() => console.log("Close button clicked")}
            className="flex items-center justify-center p-1 rounded-full hover:bg-gray-700"
            aria-label="Close"
          >
            <Cross2Icon className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        {/* View items */}
        <SelectItem value="lists" className="flex items-center px-4 py-2">
          <div className="flex justify-between w-full">
            <div className="flex items-center space-x-2">
              <CiViewTable size={20} />
              <span className="text-sm font-semibold">Lists</span>
            </div>
            <span className="text-sm ml-2 text-gray-500">20 items</span>
          </div>
        </SelectItem>

        <SelectItem value="assigned" className="flex items-center px-4 py-2">
          <div className="flex justify-between w-full">
            <div className="flex items-center space-x-2">
              <CiViewTable size={20} />
              <span className="text-sm font-semibold">Assigned to me</span>
            </div>
            <span className="text-sm ml-2 text-gray-500">20 items</span>
          </div>
        </SelectItem>

        <SelectItem value="triage" className="flex items-center px-4 py-2">
          <div className="flex justify-between w-full">
            <div className="flex items-center space-x-2">
              <CiViewTable size={20} />
              <span className="text-sm ml-2 font-semibold">
                Triage new bugs
              </span>
            </div>
            <span className="text-sm ml-2 text-gray-500">9 items</span>
          </div>
        </SelectItem>

        <SelectItem value="status" className="flex items-center px-4 py-2">
          <div className="flex justify-between w-full">
            <div className="flex items-center space-x-2">
              <CiViewTable size={20} />
              <span className="text-sm font-semibold">By status</span>
            </div>
            <span className="text-sm ml-2 text-gray-500">87 items</span>
          </div>
        </SelectItem>

        {/* Divider */}
        <div className="border-t border-gray-600 my-2" />

        {/* All items */}
        <SelectItem value="all" className="flex items-center px-4 py-2">
          <div className="flex justify-between w-full">
            <div className="flex items-center space-x-2">
              <HomeIcon className="h-4 w-4" />
              <span className="text-sm font-semibold">All items</span>
            </div>
            <span className="text-sm ml-2 text-gray-500">87 items</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ViewsFilter;
