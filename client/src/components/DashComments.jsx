import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableCell,
  TableRow,
  Modal,
  Button,
  Alert,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentDeleteSuccess, setCommentDeleteSuccess] = useState(null);
  const [commentIdToDelte, setCommentIdToDelte] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.error("Error fetching comments");
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prevComments) => [...prevComments, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      } else {
        console.log("Error fetching more comments");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelte}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentIdToDelte)
        );

        setCommentDeleteSuccess("Comment has been deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting comment");
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div>
        {commentDeleteSuccess && (
          <Alert className="mt-5" color="success">
            {commentDeleteSuccess}
          </Alert>
        )}
      </div>
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md w-full">
            <TableHead>
              <TableHeadCell>Date Created</TableHeadCell>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Number of Likes Name</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>User Name</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {comments.map((comment) => (
                <TableRow
                  key={comment._id}
                  className=" bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell>
                    {new Date(comment.updatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{comment.content}</TableCell>
                  <TableCell>{comment.numberOfLikes}</TableCell>
                  <TableCell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${comment.post[0].slug}`}
                    >
                      {comment.post[0].title}
                    </Link>
                  </TableCell>
                  <TableCell>{comment.user[0].username}</TableCell>

                  <TableCell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelte(comment._id);
                        // Delete post logic
                      }}
                      className=" font-medium text-red-800 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
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
              Load More Comments
            </button>
          )}
        </>
      ) : (
        <p>You have no comment yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>
                Yes, I'm sure.
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
