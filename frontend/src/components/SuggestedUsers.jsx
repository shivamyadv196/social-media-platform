import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector((store) => store.auth);

  return (
    <div>
      <h2 className="font-semibold mb-3 text-sm text-gray-700 dark:text-gray-200">
        Suggested for you
      </h2>

      <div className="space-y-4">
        {suggestedUsers?.length > 0 ? (
          suggestedUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between"
            >
              {/* User Info */}
              <Link
                to={`/profile/${user._id}`}
                className="flex items-center gap-3"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.profilePicture} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>

                <div className="text-sm leading-tight">
                  <p className="font-medium">{user.username}</p>
                  <p className="text-xs text-gray-500">
                    Suggested for you
                  </p>
                </div>
              </Link>

              {/* Follow Button */}
              <button
            className="bg-[#0095F6] hover:bg-[#1877F2] text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
                      >
              Follow
            </button>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-500">
            No suggestions available
          </p>
        )}
      </div>
    </div>
  );
};

export default SuggestedUsers;