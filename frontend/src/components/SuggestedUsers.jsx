import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    removeSuggestedUser,
    setAuthUser,
} from "@/redux/authSlice";

const SuggestedUsers = () => {
    const dispatch = useDispatch();

    const { suggestedUsers, user } = useSelector((store) => store.auth);

    const [loadingId, setLoadingId] = useState(null);

    const followHandler = async (id) => {
        try {
            setLoadingId(id);

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/user/followorunfollow/${id}`,
                {},
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                dispatch(
                    setAuthUser({
                        ...user,
                        following: [...user.following, id],
                    })
                );

                dispatch(removeSuggestedUser(id));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-sm">
                    Suggested for you
                </h2>

                <span className="text-xs text-gray-500">
                    {suggestedUsers.length} users
                </span>
            </div>

            <div className="space-y-4">
                {suggestedUsers.map((suggestedUser) => (
                    <div
                        key={suggestedUser._id}
                        className="flex justify-between items-center"
                    >
                        <Link
                            to={`/profile/${suggestedUser._id}`}
                            className="flex items-center gap-3"
                        >
                            <Avatar className="h-10 w-10">
                                <AvatarImage
                                    src={suggestedUser.profilePicture}
                                />
                                <AvatarFallback>
                                    {suggestedUser.username[0]}
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <p className="font-medium text-sm">
                                    {suggestedUser.username}
                                </p>

                                <p className="text-xs text-gray-500">
                                    Suggested for you
                                </p>
                            </div>
                        </Link>

                        <Button
                            size="sm"
                            disabled={loadingId === suggestedUser._id}
                            onClick={() =>
                                followHandler(suggestedUser._id)
                            }
                        >
                            {loadingId === suggestedUser._id
                                ? "Following..."
                                : "Follow"}
                        </Button>
                    </div>
                ))}

                {suggestedUsers.length === 0 && (
                    <p className="text-center text-gray-400 text-sm">
                        No more suggestions 🎉
                    </p>
                )}
            </div>
        </div>
    );
};

export default SuggestedUsers;