import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/post/getPosts");
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
        return;
      }
      setPosts(data.posts);
      console.log(data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 lg:p-28 p-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <div className="text-gray-500 text-xs sm:text-sm">
          <p>This is a simple blog app made with React, Redux, and MongoDB.</p>
          <p>You can create, read, update, and delete blog posts.</p>
          <p>
            Sign up or sign in to start ss ss ss adsd browsing and creating
            posts.
          </p>
          <p>Have fun!</p>
        </div>

        <p className="text-xs">
          Source code:{" "}
          <span className="text-blue-500 hover:underline">
            <a href="https://github.com/rizwan459/mern-blog">Click here</a>
          </span>
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>

      <div className="p-3 bg-amber-100 dark:bg-slate-700 ">
        <CallToAction />
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6 text-center">
            <h1 className="text-3xl font-semibold">Recent Posts</h1>
            <div className="flex flex-wrap gap-3 justify-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-lg text-teal-500 font-bold hover:underline"
            >
              View all posts
            </Link>{" "}
          </div>
        )}
      </div>
    </div>
  );
}
