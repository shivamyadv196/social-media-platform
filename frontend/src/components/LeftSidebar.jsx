import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'
import CreatePost from './CreatePost'
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'

const LeftSidebar = () => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const { likeNotification } = useSelector(store => store.realTimeNotification);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);


    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                dispatch(setSelectedPost(null));
                dispatch(setPosts([]));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const sidebarHandler = (textType) => {
        if (textType === 'Logout') {
            logoutHandler();
        } else if (textType === "Create") {
            setOpen(true);
        } else if (textType === "Profile") {
            navigate(`/profile/${user?._id}`);
        } else if (textType === "Home") {
            navigate("/");
        } else if (textType === 'Messages') {
            navigate("/chat");
        }
    }

    const sidebarItems = [
        { icon: <Home size={28} strokeWidth={2} />, text: "Home" },
        { icon: <Search size={28} strokeWidth={2} />, text: "Search" },
        { icon: <MessageCircle size={28} strokeWidth={2} />, text: "Messages" },
        { icon: <Heart size={28} strokeWidth={2} />, text: "Notifications" },
        { icon: <PlusSquare size={28} strokeWidth={2} />, text: "Create" },
        {
            icon: (
                <Avatar className='w-8 h-8'>
                    <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ),
            text: "Profile"
        },
        { icon: <LogOut size={28} strokeWidth={2} />, text: "Logout" },
    ]
    return (
        <div className="hidden lg:flex fixed top-0 left-0 h-screen w-[245px] border-r border-gray-200 bg-white flex-col">
            <div className='flex flex-col'>
                <div className="px-6 pt-10 pb-8">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Sosiafy
                    </h1>
                </div>
                <div className="flex flex-col gap-1 px-3">
                    {
                        sidebarItems.map((item, index) => {
                            return (
                                <div onClick={() => {
                                console.log(item.text);
                                sidebarHandler(item.text);
                            }} key={index} 
                            className="
                                        flex
                                        items-center
                                        gap-4
                                        rounded-xl
                                        px-4
                                        py-3
                                        cursor-pointer
                                        hover:bg-gray-100
                                        transition-all
                                        duration-200
                                        relative
                                        ">
                                 {item.icon}
                                    <span className="text-[17px] font-normal">
                                        {item.text}
                                    </span>
                                    {
                                        item.text === "Notifications" && likeNotification.length > 0 && (
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                    size="icon"
                                                    className="absolute left-8 top-2 h-5 w-5 rounded-full bg-red-500 text-white text-[11px] hover:bg-red-500"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        console.log("Notification Button Clicked");
                                                    }}
                                                    >
                                                    {likeNotification.length}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <div>
                                                        {
                                                            likeNotification.length === 0 ? (<p>No new notification</p>) : (
                                                                likeNotification.map((notification) => {
                                                                    return (
                                                                        <div key={notification.userId} className='flex items-center gap-2 my-2'>
                                                                            <Avatar>
                                                                                <AvatarImage src={notification.userDetails?.profilePicture} />
                                                                                <AvatarFallback>CN</AvatarFallback>
                                                                            </Avatar>
                                                                            <p className='text-sm'><span className='font-bold'>{notification.userDetails?.username}</span> liked your post</p>
                                                                        </div>
                                                                    )
                                                                })
                                                            )
                                                        }
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <CreatePost open={open} setOpen={setOpen} />

        </div>
    )
}

export default LeftSidebar