 import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import useGetFollowersFollowing from "@/hooks/useGetFollowersFollowing";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";

const FollowersFollowingDialog = ({
  open,
  setOpen,
  type,
  userId,
}) => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { user: loggedInUser } = useSelector((store) => store.auth);

  const { users, loading } = useGetFollowersFollowing(
    userId,
    type,
    open
  );

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  const followOrUnfollowHandler = async (targetUserId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/followorunfollow/${targetUserId}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        let updatedFollowing;

        if (loggedInUser.following.includes(targetUserId)) {
          updatedFollowing = loggedInUser.following.filter(
            (id) => id !== targetUserId
          );
        } else {
          updatedFollowing = [
            ...loggedInUser.following,
            targetUserId,
          ];
        }

        dispatch(
          setAuthUser({
            ...loggedInUser,
            following: updatedFollowing,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">

        {/* Header */}
        <DialogHeader className="border-b p-4">
          <DialogTitle className="text-center text-lg">
            {type === "followers" ? "Followers" : "Following"}
          </DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className="p-4 border-b">
          <Input
            placeholder={`Search ${type}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Users */}
        <div className="max-h-[450px] overflow-y-auto">

          {loading ? (
            <div className="py-10 text-center text-gray-500">
              Loading...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              No users found
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
              >
                <Link
                  to={`/profile/${user._id}`}
                  className="flex items-center gap-3"
                  onClick={() => setOpen(false)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.profilePicture} />
                    <AvatarFallback>
                      {user.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-medium text-sm">
                      {user.username}
                    </p>

                    <p className="text-xs text-gray-500">
                      {user.bio || "No bio available"}
                    </p>
                  </div>
                </Link>

                {loggedInUser?._id !== user._id && (
                  <Button
                    size="sm"
                    variant={
                      loggedInUser?.following?.includes(user._id)
                        ? "secondary"
                        : "default"
                    }
                    onClick={() => followOrUnfollowHandler(user._id)}
                  >
                    {loggedInUser?.following?.includes(user._id)
                      ? "Following"
                      : "Follow"}
                  </Button>
                )}
              </div>
            ))
          )}

        </div>

      </DialogContent>
    </Dialog>
  );
};

export default FollowersFollowingDialog;