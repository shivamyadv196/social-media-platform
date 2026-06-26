import React from "react";
import Feed from "./Feed";
import RightSidebar from "./RightSidebar";
import LeftSidebar from "./LeftSidebar";
import useGetAllPost from "@/hooks/useGetAllPost";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";

const Home = () => {
  useGetAllPost();
  useGetSuggestedUsers();

  return (
    <div className="w-full flex justify-center">
      <div className="flex w-full max-w-6xl items-start justify-between gap-12">

        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Feed */}
        <div className="flex-1 flex justify-center ml-10">
          <Feed />
        </div>

        {/* Right Sidebar */}
        <div className="sticky top-5">
        <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;