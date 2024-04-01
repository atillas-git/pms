"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import modules from "@/config/modules";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const Sidebar = () => {
  const [filter, setFilter] = useState("");
  const pathname = usePathname()
  return (
    <div className="w-full h-full p-4 bg-zinc-800 flex flex-col gap-4 text-zinc-300">
      <div className="text-zinc-50 font-semibold text-lg border-b py-2">
        Bellis Deluxe Hotel
      </div>
      <div className="flex items-center gap-2 px-4 py-1 bg-zinc-500 rounded-md">
        <Search className="text-zinc-50 h-5 w-5 " />
        <input
          type="text"
          className="bg-transparent w-full outline-none p-2 text-zinc-50"
          placeholder="Search"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="flex flex-col overflow-y-auto overflow-x-hidden gap-3">
        {modules.items.map((sidebarItem, index) => {
          return (
            <React.Fragment key={index}>
              <h6 className="text-zinc-50 font-semibold">
                {sidebarItem.heading}
              </h6>
              <ul className="flex flex-col w-full gap-1">
                {sidebarItem.elements
                  .filter((sidebarSubItem) =>
                    sidebarSubItem.label
                      .toLocaleLowerCase()
                      .includes(filter.toLocaleLowerCase()),
                  )
                  .map((sidebarSubItem) => {
                    return (
                      <li key={sidebarSubItem.label + sidebarSubItem.path}>
                        <Link
                          href={sidebarSubItem.path}
                          className={cn("flex gap-2 cursor-pointer ml-2 transition-all hover:bg-zinc-500 p-2 rounded-md",sidebarSubItem.path === pathname && "bg-zinc-500")}
                        >
                          {sidebarSubItem.icon}
                          {sidebarSubItem.label}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </React.Fragment>
          );
        })}
      </div>
      <footer className="mt-auto w-full text-center">
        <p>Xaypher</p>
        <small>Version: 0.0.1</small>
      </footer>
    </div>
  );
};

export default Sidebar;
