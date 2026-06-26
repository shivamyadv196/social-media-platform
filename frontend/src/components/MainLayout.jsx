import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#fafafa]">

      {/* Left Sidebar */}
      <LeftSidebar />

      {/* Main */}
      <div className="ml-64">
        <Outlet />
      </div>

    </div>
  );
};

export default MainLayout;