import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setSelectedUser } from '@/redux/authSlice';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MessageCircleCode } from 'lucide-react';
import Messages from './Messages';
import axios from 'axios';
import { setMessages } from '@/redux/chatSlice';
import { addMessage } from "@/redux/chatSlice";
const ChatPage = () => {
    const [textMessage, setTextMessage] = useState("");
    const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
    const { onlineUsers, messages } = useSelector(store => store.chat);
    const dispatch = useDispatch();

    const sendMessageHandler = async (receiverId) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/message/send/${receiverId}`, { textMessage }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(addMessage(res.data.newMessage));
                setTextMessage("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setSelectedUser(null));
        }
    },[]);

   return (
    <div className="flex w-full h-[calc(100vh-60px)] max-w-7xl mx-auto overflow-hidden border rounded-xl shadow bg-white">

        {/* LEFT SIDEBAR */}
        <section
            className={`
                ${selectedUser ? "hidden md:flex" : "flex"}
                flex-col
                w-full
                md:w-[320px]
                border-r
                border-gray-300
                bg-white
            `}
        >

            <h1 className="font-bold text-xl px-4 py-4">
                {user?.username}
            </h1>

            <hr className="border-gray-300" />

            <div className="flex-1 overflow-y-auto px-2">
                {
                    suggestedUsers.map((suggestedUser) => {
                        const isOnline = onlineUsers.includes(suggestedUser?._id);

                        return (
                            <div
                                key={suggestedUser?._id}
                                onClick={() => dispatch(setSelectedUser(suggestedUser))}
                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
                                    ${
                                        selectedUser?._id === suggestedUser?._id
                                            ? "bg-gray-100"
                                            : "hover:bg-gray-50"
                                    }`}
                            >
                                <Avatar className="w-12 h-12">
                                    <AvatarImage src={suggestedUser?.profilePicture} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>

                                <div className="flex flex-col">
                                    <span className="font-medium">
                                        {suggestedUser?.username}
                                    </span>

                                    <span
                                        className={`text-xs ${
                                            isOnline
                                                ? "text-green-600"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {isOnline ? "Active now" : "Offline"}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </section>

        {/* CHAT AREA */}

        {
            selectedUser ? (
                <section
                    className={`
                        flex
                        flex-1
                        flex-col
                        h-full
                        bg-white
                    `}
                >

                    {/* HEADER */}

                    <div className="flex items-center gap-3 h-16 pl-20 pr-4 border-b border-gray-300 bg-white shrink-0">

                        <Avatar className="w-10 h-10">
                            <AvatarImage
                                src={selectedUser?.profilePicture}
                                alt="profile"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                            <span className="font-semibold">
                                {selectedUser?.username}
                            </span>

                            <span
                                className={`text-xs ${
                                    onlineUsers.includes(selectedUser?._id)
                                        ? "text-green-600"
                                        : "text-gray-400"
                                }`}
                            >
                                {onlineUsers.includes(selectedUser?._id)
                                    ? "Active now"
                                    : "Offline"}
                            </span>
                        </div>

                    </div>

                    {/* MESSAGES */}

                    <div className="flex-1 overflow-hidden">
                        <Messages selectedUser={selectedUser} />
                    </div>

                    {/* INPUT */}

                    <div className="flex items-center gap-3 p-4 border-t border-gray-300 bg-white shrink-0">

                        <Input
                            value={textMessage}
                            onChange={(e) => setTextMessage(e.target.value)}
                            onKeyDown={(e)=>{
                                if(e.key==="Enter"){
                                    sendMessageHandler(selectedUser._id);
                                }
                            }}
                            type="text"
                            placeholder="Message..."
                            className="flex-1 rounded-full focus-visible:ring-transparent"
                        />

                        <Button
                            className="rounded-full px-6"
                            onClick={() =>
                                sendMessageHandler(selectedUser?._id)
                            }
                        >
                            Send
                        </Button>

                    </div>

                </section>
            ) : (
                <div className="hidden md:flex flex-1 flex-col items-center justify-center">

                    <MessageCircleCode className="w-24 h-24 text-gray-400 mb-4" />

                    <h1 className="text-2xl font-semibold">
                        Your messages
                    </h1>

                    <span className="text-gray-500 mt-2">
                        Send a message to start a chat.
                    </span>

                </div>
            )
        }

    </div>
);

}

export default ChatPage