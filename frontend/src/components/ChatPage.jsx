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
                dispatch(setMessages([...messages, res.data.newMessage]));
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
    <div className='flex flex-col md:flex-row h-[100vh] w-full md:ml-[16%] overflow-hidden'>
        
        {/* LEFT SIDEBAR */}
        <section className='w-full md:w-1/4 md:my-8 border-b md:border-b-0 md:border-r border-gray-300'>
            
            <h1 className='font-bold mb-4 px-3 text-xl pt-4 md:pt-0'>
                {user?.username}
            </h1>

            <hr className='mb-4 border-gray-300 hidden md:block' />

            <div className='flex md:block overflow-x-auto md:overflow-y-auto md:h-[80vh] px-2 md:px-0 gap-2 md:gap-0'>
                {
                    suggestedUsers.map((suggestedUser) => {
                        const isOnline = onlineUsers.includes(suggestedUser?._id);
                        return (
                            <div
                                onClick={() => dispatch(setSelectedUser(suggestedUser))}
                                className='flex-shrink-0 md:flex-shrink flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer rounded-md'
                            >
                                <Avatar className='w-12 h-12 md:w-14 md:h-14'>
                                    <AvatarImage src={suggestedUser?.profilePicture} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>

                                <div className='flex flex-col'>
                                    <span className='font-medium text-sm md:text-base'>
                                        {suggestedUser?.username}
                                    </span>
                                    <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                                        {isOnline ? 'online' : 'offline'}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>

        {/* CHAT AREA */}
        {
            selectedUser ? (
                <section className='flex-1 flex flex-col h-[100vh] md:h-full'>
                    
                    {/* HEADER */}
                    <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10'>
                        <Avatar>
                            <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                            <span className='text-sm md:text-base'>
                                {selectedUser?.username}
                            </span>
                        </div>
                    </div>

                    {/* MESSAGES */}
                    <div className='flex-1 overflow-y-auto'>
                        <Messages selectedUser={selectedUser} />
                    </div>

                    {/* INPUT */}
                    <div className='flex items-center p-3 md:p-4 border-t border-gray-300'>
                        <Input
                            value={textMessage}
                            onChange={(e) => setTextMessage(e.target.value)}
                            type="text"
                            className='flex-1 mr-2 focus-visible:ring-transparent'
                            placeholder="Messages..."
                        />
                        <Button onClick={() => sendMessageHandler(selectedUser?._id)}>
                            Send
                        </Button>
                    </div>
                </section>
            ) : (
                <div className='flex flex-col items-center justify-center w-full h-[70vh] md:h-full'>
                    <MessageCircleCode className='w-20 h-20 md:w-32 md:h-32 my-4' />
                    <h1 className='font-medium'>Your messages</h1>
                    <span className='text-sm md:text-base'>
                        Send a message to start a chat.
                    </span>
                </div>
            )
        }
    </div>
)
}

export default ChatPage