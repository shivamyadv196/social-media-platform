import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SuggestedUsers from "./SuggestedUsers";

const RightSidebar = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <aside className="sticky top-8 w-[300px] hidden xl:block">

      {/* User Profile */}
      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-3">

          <Link to={`/profile/${user?._id}`}>
            <Avatar className="w-14 h-14">
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>

          <div>

            <Link
              to={`/profile/${user?._id}`}
              className="font-semibold text-sm hover:underline"
            >
              {user?.username}
            </Link>

            <p className="text-sm text-gray-500 truncate w-40">
              {user?.bio || "Welcome to Chatify"}
            </p>

          </div>

        </div>

        <button
          className="text-xs font-semibold text-[#0095F6] hover:text-black transition"
        >
          Switch
        </button>

      </div>

      {/* Suggested Users */}

      <SuggestedUsers />

    </aside>
  );
};

export default RightSidebar;