import React, { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllMessage from "@/hooks/useGetAllMessage";
import useGetRTM from "@/hooks/useGetRTM";

const Messages = ({ selectedUser }) => {
    useGetRTM();
    useGetAllMessage();

    const { messages } = useSelector((store) => store.chat);
    const { user } = useSelector((store) => store.auth);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    return (
        <div className="overflow-y-auto flex-1 p-4">

            {/* User Info */}
            <div className="flex justify-center mb-6">
                <div className="flex flex-col items-center">
                    <Avatar className="h-20 w-20">
                        <AvatarImage
                            src={selectedUser?.profilePicture}
                            alt="profile"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <span className="font-semibold mt-2">
                        {selectedUser?.username}
                    </span>

                    <Link to={`/profile/${selectedUser?._id}`}>
                        <Button
                            className="h-8 mt-2"
                            variant="secondary"
                        >
                            View Profile
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Messages */}

            <div className="flex flex-col gap-3">

                {messages.length === 0 && (
                    <p className="text-center text-gray-400">
                        No messages yet
                    </p>
                )}

                {messages.map((msg) => {
                    const isOwnMessage = msg.senderId === user?._id;

                    return (
                        <div
                            key={msg._id}
                            className={`flex ${
                                isOwnMessage
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm ${
                                    isOwnMessage
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-black"
                                }`}
                            >
                                <p>{msg.message}</p>

                                {msg.createdAt && (
                                    <p className="text-[10px] opacity-70 mt-1 text-right">
                                        {new Date(
                                            msg.createdAt
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}

                <div ref={bottomRef}></div>

            </div>

        </div>
    );
};

export default Messages;