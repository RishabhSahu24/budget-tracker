"use client";
import React from "react";
import Image from "next/image";
import sidebarmenu from "../../constants/sidebarmenu.json";
import { MdDashboard } from "react-icons/md";
import { FaPiggyBank } from "react-icons/fa";
import { IoReceiptSharp } from "react-icons/io5";
import { HiShieldCheck } from "react-icons/hi";
import { usePathname } from "next/navigation";

const iconMapping: any = {
  MdDashboard: MdDashboard,
  FaPiggyBank: FaPiggyBank,
  IoReceiptSharp: IoReceiptSharp,
  HiShieldCheck: HiShieldCheck,
};

const Sidebar = () => {
  const params = usePathname();
  console.log(params);
  return (
    <div className="flex p-2 h-screen flex-col justify-between bg-gray-100 border-r">
      <div>
        <div className="flex flex-col items-center mt-2 mb-6">
          <Image src={"../logo.svg"} alt={""} height={100} width={100} />
        </div>

        <div className="flex flex-col">
          {sidebarmenu.map((menu) => {
            const Icon = iconMapping[menu?.icon];
            return (
              <a
                key={menu.id}
                href={menu.path}
                className="flex items-center p-4 text-gray-800 hover:bg-gray-200 rounded-lg"
              >
                {Icon && <Icon className="mr-3 h-5 w-5" />}
                <span>{menu.name}</span>
              </a>
            );
          })}
        </div>
      </div>
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-300">
        <a
          href="#"
          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-100"
        >
          <img
            alt=""
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="size-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs text-gray-800">
              <strong className="block font-medium">Eric Frusciante</strong>

              <span> eric@frusciante.com </span>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
