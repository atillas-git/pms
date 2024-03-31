import Sidebar from "@/components/shared/Sidebar";
import React from "react";

const PortalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen grid grid-cols-12">
      <div className="hidden sm:col-span-2 sm:flex h-full">
        <Sidebar />
      </div>
      <div className="col-span-12 sm:col-span-10">{children}</div>
    </div>
  );
};

export default PortalLayout;
