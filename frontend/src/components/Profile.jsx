import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign, Heart, MessageCircle } from 'lucide-react';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');

  const { userProfile, user } = useSelector(store => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = false;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

   return (
            <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">

              <div className="flex flex-col gap-10 py-6">

                {/* TOP SECTION */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">

                  {/* AVATAR */}
                  <section className="flex justify-center sm:justify-end">
                    <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                      <AvatarImage src={userProfile?.profilePicture} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </section>

                  {/* INFO */}
                  <section>
                    <div className="flex flex-col gap-4 text-center sm:text-left">

                      {/* USER + BUTTONS */}
                      <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                        <span className="font-semibold text-lg">
                          {userProfile?.username}
                        </span>

                        {isLoggedInUserProfile ? (
                          <>
                            <Link to="/account/edit">
                              <Button variant="secondary" className="h-8">
                                Edit
                              </Button>
                            </Link>
                            <Button variant="secondary" className="h-8">
                              Archive
                            </Button>
                            <Button variant="secondary" className="h-8">
                              Tools
                            </Button>
                          </>
                        ) : isFollowing ? (
                          <>
                            <Button variant="secondary" className="h-8">
                              Unfollow
                            </Button>
                            <Button variant="secondary" className="h-8">
                              Message
                            </Button>
                          </>
                        ) : (
                          <Button className="bg-[#0095F6] h-8">
                            Follow
                          </Button>
                        )}
                      </div>

                      {/* STATS */}
                      <div className="flex justify-center sm:justify-start gap-6 text-sm">
                        <p>
                          <span className="font-semibold">
                            {userProfile?.posts?.length || 0}
                          </span>{" "}
                          posts
                        </p>
                        <p>
                          <span className="font-semibold">
                            {userProfile?.followers?.length || 0}
                          </span>{" "}
                          followers
                        </p>
                        <p>
                          <span className="font-semibold">
                            {userProfile?.following?.length || 0}
                          </span>{" "}
                          following
                        </p>
                      </div>

                      {/* BIO */}
                      <div className="flex flex-col gap-1 text-center sm:text-left">
                        <span className="font-semibold">
                          {userProfile?.bio || "bio here..."}
                        </span>

                        <Badge className="w-fit mx-auto sm:mx-0">
                          <AtSign className="w-4 h-4" />
                          <span className="pl-1">
                            {userProfile?.username}
                          </span>
                        </Badge>
                      </div>

                    </div>
                  </section>
                </div>

                {/* TABS */}
                <div className="border-t border-gray-200">
                  <div className="flex justify-center gap-6 sm:gap-10 text-xs sm:text-sm">
                    <span
                      className={`py-3 cursor-pointer ${
                        activeTab === "posts" ? "font-bold" : ""
                      }`}
                      onClick={() => handleTabChange("posts")}
                    >
                      POSTS
                    </span>

                    <span
                      className={`py-3 cursor-pointer ${
                        activeTab === "saved" ? "font-bold" : ""
                      }`}
                      onClick={() => handleTabChange("saved")}
                    >
                      SAVED
                    </span>

                    <span className="py-3 cursor-pointer">REELS</span>
                    <span className="py-3 cursor-pointer">TAGS</span>
                  </div>

                  {/* POSTS GRID */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-[2px]">
                    {displayedPost?.map((post) => (
                      <div
                        key={post?._id}
                        className="relative group cursor-pointer"
                      >
                        <img
                          src={post.image}
                          className="w-full aspect-square object-cover"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition">
                          <div className="flex items-center text-white gap-4">
                            <Heart />
                            <span>{post?.likes?.length}</span>
                            <MessageCircle />
                            <span>{post?.comments?.length}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          );
}

export default Profile