import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";

const Posts = () => {
  const { posts } = useSelector((store) => store.post);

  if (!posts || posts.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <h1 className="text-gray-500 text-lg">
          No posts available
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">

      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
        />
      ))}

    </div>
  );
};

export default Posts;