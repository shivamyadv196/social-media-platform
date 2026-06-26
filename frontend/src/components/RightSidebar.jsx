import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SuggestedUsers from "./SuggestedUsers";

const RightSidebar = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="w-80 hidden lg:block">
      
      <div className="sticky top-5 space-y-5">

        {/* User Profile Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm">
          
          <div className="flex items-center gap-3">
            
            <Link to={`/profile/${user?._id}`}>
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>

            <div className="leading-tight">
              <h1 className="font-semibold text-sm">
                <Link to={`/profile/${user?._id}`}>
                  {user?.username}
                </Link>
              </h1>

              <span className="text-xs text-gray-500">
                {user?.bio || "Bio here..."}
              </span>
            </div>

          </div>
        </div>

        {/* Suggested Users */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm">
          <SuggestedUsers />
        </div>

      </div>

    </div>
  );
};

export default RightSidebar;