import React from "react";
import Feed from "./Feed";
import RightSidebar from "./RightSidebar";
import { Outlet } from "react-router-dom";

import useGetAllPost from "@/hooks/useGetAllPost";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";

const Home = () => {
  useGetAllPost();
  useGetSuggestedUsers();

  return (
    <>
      <div className="min-h-screen bg-[#fafafa]">
        <div className="max-w-[1180px] mx-auto flex justify-center gap-10 px-4 pt-8">

          {/* Feed */}
          <div className="flex-1 flex justify-center">
            <Feed />
          </div>

          {/* Right Sidebar (Desktop Only) */}
          <div className="hidden xl:block w-[320px]">
            <RightSidebar />
          </div>

        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Home;