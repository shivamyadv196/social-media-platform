import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SuggestedUsers from "./SuggestedUsers";

const RightSidebar = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="sticky top-8 w-[320px]">

      {/* User Card */}
      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-3">

          <Link to={`/profile/${user?._id}`}>
            <Avatar className="w-14 h-14">
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>

          <div>
            <h1 className="font-semibold text-sm">
              {user?.username}
            </h1>

            <p className="text-sm text-gray-500">
              {user?.bio || "Welcome 👋"}
            </p>

          </div>

        </div>

      </div>

      <SuggestedUsers />

    </div>
  );
};

export default RightSidebar;