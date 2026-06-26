import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Desktop Sidebar */}
      <LeftSidebar />

      {/* Main Content */}
      <main className="w-full md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;