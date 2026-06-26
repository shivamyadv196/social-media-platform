import React from "react";
import Feed from "./Feed";
import RightSidebar from "./RightSidebar";
import useGetAllPost from "@/hooks/useGetAllPost";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";

const Home = () => {

    useGetAllPost();
    useGetSuggestedUsers();

    return (

        <div className="flex justify-center">

            <div className="w-full max-w-[1260px] flex justify-between px-10 pt-8">

                <Feed />

                <RightSidebar />

            </div>

        </div>

    );
};

export default Home;