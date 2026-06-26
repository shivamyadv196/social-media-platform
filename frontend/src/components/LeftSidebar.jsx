import React, { useState } from "react";
import {
  Home,
  Search,
  Compass,
  MessageCircle,
  Heart,
  PlusSquare,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "./CreatePost";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import {
  setAuthUser,
} from "@/redux/authSlice";
import {
  setPosts,
  setSelectedPost,
} from "@/redux/postSlice";

const LeftSidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);

  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );

  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/logout`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));

        toast.success(res.data.message);

        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sidebarHandler = (text) => {

    switch (text) {

      case "Home":
        navigate("/");
        break;

      case "Messages":
        navigate("/chat");
        break;

      case "Create":
        setOpen(true);
        break;

      case "Profile":
        navigate(`/profile/${user?._id}`);
        break;

      case "Logout":
        logoutHandler();
        break;

      default:
        break;
    }
  };

  const sidebarItems = [

    {
      icon: <Home size={26} />,
      text: "Home",
    },

    {
      icon: <Search size={26} />,
      text: "Search",
    },

    {
      icon: <Compass size={26} />,
      text: "Explore",
    },

    {
      icon: <MessageCircle size={26} />,
      text: "Messages",
    },

    {
      icon: <Heart size={26} />,
      text: "Notifications",
    },

    {
      icon: <PlusSquare size={26} />,
      text: "Create",
    },

    {
      icon: (
        <Avatar className="w-7 h-7">
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },

    {
      icon: <LogOut size={26} />,
      text: "Logout",
    },

  ];
    return (
    <>
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex-col justify-between px-4 py-6 z-50">

        <div>

          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold mb-10 cursor-pointer"
          >
            Chatify
          </h1>

          <div className="space-y-2">

            {sidebarItems.map((item, index) => (

              <div
                key={index}
                onClick={() => sidebarHandler(item.text)}
                className="flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer hover:bg-gray-100 transition-all duration-200 relative"
              >

                {item.icon}

                <span className="font-medium">
                  {item.text}
                </span>

                {item.text === "Notifications" &&
                  likeNotification?.length > 0 && (

                    <Popover>

                      <PopoverTrigger asChild>

                        <Button
                          size="icon"
                          className="absolute left-7 top-1 h-5 w-5 rounded-full bg-red-500 hover:bg-red-500 text-white text-[10px]"
                        >
                          {likeNotification.length}
                        </Button>

                      </PopoverTrigger>

                      <PopoverContent className="w-72">

                        <div className="space-y-3">

                          {likeNotification.map((notification) => (

                            <div
                              key={notification.userId}
                              className="flex gap-3 items-center"
                            >

                              <Avatar>

                                <AvatarImage
                                  src={
                                    notification.userDetails?.profilePicture
                                  }
                                />

                                <AvatarFallback>
                                  CN
                                </AvatarFallback>

                              </Avatar>

                              <p className="text-sm">

                                <span className="font-semibold">
                                  {notification.userDetails?.username}
                                </span>{" "}

                                liked your post

                              </p>

                            </div>

                          ))}

                        </div>

                      </PopoverContent>

                    </Popover>

                  )}

              </div>

            ))}

          </div>

        </div>

      </aside>

      <CreatePost
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default LeftSidebar;