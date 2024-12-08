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

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userDeleteSuccess, setUserDeleteSuccess] = useState(null);
  const [userIdToDelte, setUserIdToDelte] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.error("Error fetching users");
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/users/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prevUsers) => [...prevUsers, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      } else {
        console.log("Error fetching more users");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelte}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userIdToDelte)
        );

        setUserDeleteSuccess("User has been deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting user");
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div>
        {userDeleteSuccess && (
          <Alert className="mt-5" color="success">
            {userDeleteSuccess}
          </Alert>
        )}
      </div>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md w-full">
            <TableHead>
              <TableHeadCell>Date Created</TableHeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>User Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {users.map((user) => (
                <TableRow
                  key={user._id}
                  className=" bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell>
                    {new Date(user.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                    />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </TableCell>

                  <TableCell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelte(user._id);
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
              Load More Posts
            </button>
          )}
        </>
      ) : (
        <p>You have no user yet!</p>
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
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
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
