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
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      <div className="flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <section className="flex justify-center md:justify-start">
            <Avatar className="h-40 w-40 ring-4 ring-gray-200">
              <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>

          <section className="md:col-span-2">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
              <h1 className="text-3xl font-light">
                   {userProfile?.username}
              </h1>
                {
                  isLoggedInUserProfile ? (
                    <>
                      <Link to="/account/edit"><Button
                                variant="secondary"
                                className="hover:bg-gray-200 h-9 rounded-lg px-4"
                        >                       Edit profile</Button></Link>

                        
                      <Button
                        variant="secondary"
                        className="hover:bg-gray-200 h-9 rounded-lg px-4"
                      >              View archive</Button>
                      <Button
                         variant="secondary"
                         className="hover:bg-gray-200 h-9 rounded-lg px-4"
                 >        Ad tools</Button>
                    </>
                  ) : (
                    isFollowing ? (
                      <>
                        
                   <Button
                    variant="secondary"
                    className="hover:bg-gray-200 h-9 rounded-lg px-4"
                   >
                      Unfollow
                       </Button>

                        <Button
                    variant="secondary"
                    className="hover:bg-gray-200 h-9 rounded-lg px-4"
                 >
                      Message
                 </Button>
                      </>
                    ) : (
                      <Button className="bg-[#0095F6] hover:bg-[#1877F2] h-9 rounded-lg px-6">Follow</Button>
                    )
                  )
                }
              </div>
              <div className="flex justify-center md:justify-start gap-10 text-center md:text-left">
                
          <p>
                 <span className="font-bold text-lg">
                   {userProfile?.posts?.length || 0}
                </span>
                   <br />
                  <span className="text-gray-500">
                     Posts
                 </span>
          </p>

                
               <p>
                    <span className="font-bold text-lg">
                   {userProfile?.followers?.length || 0}
                  </span>
                  <br />
                    <span className="text-gray-500">
                     Followers
                   </span>
                </p>


        <p>
               <span className="font-bold text-lg">
                   {userProfile?.following?.length || 0}
               </span>
                     <br />
              <span className="text-gray-500">
                    Following
              </span>
        </p>


              </div>
              <div className="space-y-2">
                

    <h2 className="font-semibold text-lg">
          {userProfile?.username}
    </h2>

      <p className="text-gray-700 leading-6">
           {userProfile?.bio || "No bio available"}
      </p>

          <Badge
                 className="w-fit rounded-full px-3 py-1"
                 variant="secondary"
          > <AtSign /> <span className='pl-1'>{userProfile?.username}</span> </Badge>
                

                <p className="text-gray-500 text-sm">
                 📍 India
               </p>

                <p className="text-gray-500 text-sm">
                💻 Full Stack Developer
                </p>


              </div>
            </div>
          </section>
        </div>
        <div className="border-t mt-12">
          <div className="flex justify-center gap-10 uppercase text-xs font-semibold tracking-widest">
            
            <span
                 className={`py-4 border-t-2 cursor-pointer transition ${
                 activeTab === "posts"
               ? "border-black text-black"
               : "border-transparent text-gray-500 hover:text-black"
                  }`}
                    onClick={() => handleTabChange("posts")}
                 >
                  POSTS
           </span>
           

              <span
                    className={`py-4 border-t-2 cursor-pointer transition ${
                    activeTab === "saved"
                     ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-black"
                  }`}
                     onClick={() => handleTabChange("saved")}
                      >
                      SAVED
              </span>


            
        <span className="py-4 border-t-2 border-transparent cursor-pointer text-gray-500 hover:text-black transition">
                      REELS
                     </span>

           <span className="py-4 border-t-2 border-transparent cursor-pointer text-gray-500 hover:text-black transition">
             TAGS
              </span>


          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1 md:gap-2 mt-8">
            {
              displayedPost?.map((post) => {
                return (
                  <div
                      key={post?._id}
                   className="relative group overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
                   >
                    <img src={post.image} alt='postimage' className="w-full aspect-square object-cover duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex items-center gap-8 text-white text-lg font-semibold">
                        <button className="flex items-center gap-2 transition hover:scale-110">
                          <Heart />
                          <span>{post?.likes.length}</span>
                        </button>
                        <button className="flex items-center gap-2 transition hover:scale-110">
                          <MessageCircle />
                          <span>{post?.comments.length}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile