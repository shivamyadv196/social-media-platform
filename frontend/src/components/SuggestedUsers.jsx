import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector((store) => store.auth);

  return (
    <div>

      {/* Heading */}

      <div className="flex items-center justify-between mb-5">

        <h2 className="text-sm font-semibold text-gray-500">
          Suggested for you
        </h2>

        <button className="text-xs font-semibold hover:text-gray-500">
          See All
        </button>

      </div>

      {/* Users */}

      <div className="space-y-5">

        {suggestedUsers?.length > 0 ? (

          suggestedUsers.map((user) => (

            <div
              key={user._id}
              className="flex items-center justify-between"
            >

              <div className="flex items-center gap-3">

                <Link to={`/profile/${user._id}`}>

                  <Avatar className="w-11 h-11">

                    <AvatarImage
                      src={user.profilePicture}
                    />

                    <AvatarFallback>
                      CN
                    </AvatarFallback>

                  </Avatar>

                </Link>

                <div>

                  <Link
                    to={`/profile/${user._id}`}
                    className="text-sm font-semibold hover:underline"
                  >
                    {user.username}
                  </Link>

                  <p className="text-xs text-gray-500 truncate w-36">
                    {user.bio || "Suggested for you"}
                  </p>

                </div>

              </div>

              <button
                className="text-xs font-semibold text-[#0095F6] hover:text-black transition"
              >
                Follow
              </button>

            </div>

          ))

        ) : (

          <p className="text-sm text-gray-400">
            No suggestions available
          </p>

        )}

      </div>

    </div>
  );
};

export default SuggestedUsers;