import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import MobileSidebar from "./MobileSidebar";
import CreatePost from "./CreatePost";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa]">

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 bg-white px-3 py-1 shadow rounded"
      >
        ☰
      </button>

      {/* MOBILE SIDEBAR */}
      <MobileSidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        setCreateOpen={setCreateOpen}
      />

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:block fixed left-0 top-0">
        <LeftSidebar />
      </div>

      {/* CONTENT */}
      <div className="lg:pl-[245px]">
        <Outlet />
      </div>

      {/* CREATE POST MODAL (GLOBAL FIX) */}
      <CreatePost open={createOpen} setOpen={setCreateOpen} />

    </div>
  );
};

export default MainLayout;