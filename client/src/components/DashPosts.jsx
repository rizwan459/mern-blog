import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableCell,
  TableRow,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.error("Error fetching posts");
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prevPosts) => [...prevPosts, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      } else {
        console.log("Error fetching more posts");
      }
    } catch (error) {
      console.error("Error fetching more posts");
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <TableHead>
              <TableHeadCell>Date Updated</TableHeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {userPosts.map((post) => (
                <TableRow
                  key={post._id}
                  className=" bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell>
                    {new Date(post.updatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Link to={`/editPost/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/editPost/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <Link
                      to={`/updatePost/${post._id}`}
                      className=" font-medium text-teal-500 hover:underline cursor-pointer"
                    >
                      Edit
                    </Link>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => {
                        // Delete post logic
                      }}
                      className=" font-medium text-red-800 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="mt-5 w-full text-center text-gray-900 font-medium hover:text-gray-800"
            >
              Load More Posts
            </button>
          )}
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
    </div>
  );
}
