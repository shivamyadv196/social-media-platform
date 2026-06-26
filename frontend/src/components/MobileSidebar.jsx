import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Search,
  TrendingUp,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
  LogOut,
} from "lucide-react";

import CreatePost from "./CreatePost";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import axios from "axios";
import { toast } from "sonner";

const MobileSidebar = ({ open, setOpen, setCreateOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/logout`,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setAuthUser(null));
        toast.success("Logged out");
        navigate("/login");
      }
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const handleClick = (text) => {
    if (text === "Create") {
	setCreateOpen(true);
	setOpen(false);
	return;
	}
    else if (text === "Home") {
      navigate("/");
    } 
    else if (text === "Search") {
      navigate("/search"); // only if exists
    } 
    else if (text === "Explore") {
      navigate("/explore"); // only if exists
    } 
    else if (text === "Messages") {
      navigate("/chat");
    } 
    else if (text === "Profile") {
      navigate("/profile/me");
    } 
    else if (text === "Logout") {
      logoutHandler(); // ❌ NOT route
    }

    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* SIDEBAR */}
      <div className="absolute left-0 top-0 h-full w-[250px] bg-white shadow-xl p-4">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* ITEMS */}
        <div className="flex flex-col gap-4 text-[15px]">

          <div onClick={() => handleClick("Home")} className="flex items-center gap-3 cursor-pointer">
            <Home size={20} /> Home
          </div>

          <div onClick={() => handleClick("Search")} className="flex items-center gap-3 cursor-pointer">
            <Search size={20} /> Search
          </div>

          <div onClick={() => handleClick("Explore")} className="flex items-center gap-3 cursor-pointer">
            <TrendingUp size={20} /> Explore
          </div>

          <div onClick={() => handleClick("Messages")} className="flex items-center gap-3 cursor-pointer">
            <MessageCircle size={20} /> Messages
          </div>

          <div onClick={() => handleClick("Notifications")} className="flex items-center gap-3 cursor-pointer">
            <Heart size={20} /> Notifications
          </div>

          <div onClick={() => handleClick("Create")} className="flex items-center gap-3 cursor-pointer">
            <PlusSquare size={20} /> Create
          </div>

          <div onClick={() => handleClick("Profile")} className="flex items-center gap-3 cursor-pointer">
            <User size={20} /> Profile
          </div>

          <div onClick={() => handleClick("Logout")} className="flex items-center gap-3 cursor-pointer text-red-500">
            <LogOut size={20} /> Logout
          </div>

        </div>
      </div> 
    </div>
  );
};

export default MobileSidebar;