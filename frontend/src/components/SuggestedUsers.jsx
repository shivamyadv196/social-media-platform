import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const SuggestedUsers = () => {

  const { suggestedUsers } = useSelector((store) => store.auth);

  return (
    <div>

      <div className="flex justify-between items-center mb-5">

        <h1 className="text-sm font-semibold text-gray-500">
          Suggested for you
        </h1>

        <span className="text-xs font-semibold cursor-pointer hover:text-gray-500">
          See All
        </span>

      </div>

      <div className="space-y-5">

        {suggestedUsers?.map((user) => (

          <div
            key={user._id}
            className="flex items-center justify-between"
          >

            <div className="flex items-center gap-3">

              <Link to={`/profile/${user._id}`}>

                <Avatar className="w-10 h-10">

                  <AvatarImage src={user.profilePicture} />

                  <AvatarFallback>CN</AvatarFallback>

                </Avatar>

              </Link>

              <div>

                <h1 className="text-sm font-semibold">
                  {user.username}
                </h1>

                <p className="text-xs text-gray-500 truncate w-36">
                  {user.bio || "Suggested for you"}
                </p>

              </div>

            </div>

            <button
              className="text-[#0095F6] text-xs font-semibold hover:text-black"
            >
              Follow
            </button>

          </div>

        ))}

      </div>

    </div>
  );
};

export default SuggestedUsers;