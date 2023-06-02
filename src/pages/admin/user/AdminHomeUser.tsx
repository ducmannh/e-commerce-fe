/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import AdminHeader from "../AdminHeader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../../../redux/storeSlice";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { format } from "date-fns";
import { Toaster, toast } from "react-hot-toast";

const AdminHomeUser = () => {
  const user = useSelector((value: any) => value.store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameUser = localStorage.getItem("name");
  const [open, setOpen] = React.useState<boolean>(false);
  const [id, setId] = React.useState<string>("");

  const getUsers = () => {
    axios
      .get("http://localhost:2304/users")
      .then((res) => dispatch(listUsers(res.data)));
  };

  const handleSearch = (searchInput: string) => {
    if (searchInput) {
      const searchResult = user.filter((value: any) => {
        return value.name.toLowerCase().includes(searchInput.toLowerCase());
      });
      dispatch(listUsers(searchResult));
    } else {
      getUsers();
    }
  };

  const handleEditProduct = (id: string, name: string) => {
    if (name === nameUser) {
      navigate(`/admin-users/update-user/${id}`);
    } else {
      toast.error("Please login to the correct account");
    }
  };

  const handleOpenDialog = (id: string, name: string) => {
    if (name === nameUser) {
      setOpen(true);
      setId(id);
    } else {
      toast.error("Please login to the correct account");
    }
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:2304/users/${id}`).then((res) => {
      dispatch(listUsers(res.data));
      toast.success(
        "Deleted success, You will be redirected to the login page after 5s"
      );
      setTimeout(() => {
        navigate("/admin-login");
      }, 3000);
      setOpen(false);
    });
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <AdminHeader handleSearch={handleSearch} />
      <Toaster />

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white-smoke p-6 rounded-lg shadow">
            <button
              type="button"
              className="ml-96 text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
              onClick={() => setOpen(false)}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <p className="mb-4 text-center text-lg">
              Are you sure you want to delete this user?
            </p>
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 text-gray-500 w-14 h-14"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div className="flex justify-center text-lg">
              <button
                className="px-4 py-2 mr-2 w-36 text-white bg-rose-600 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 rounded"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 w-36 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded"
                type="button"
                onClick={handleDelete}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-2xl mx-10 flex items-center my-6">
        <p className="mr-4">Welcome back, {nameUser}</p>
        <div
          className="underline decoration-blue-800 text-blue-800 mr-5 cursor-pointer"
          onClick={() => navigate("/admin-login")}
        >
          Logout
        </div>
      </div>

      <div className="mx-10 mb-10">
        <table className="w-full text-md text-center text-gray-500 table-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="border px-6 py-3">Name</th>
              <th className="border px-6 py-3">Email</th>
              <th className="border px-6 py-3">Phone</th>
              <th className="border px-6 py-3">Created At</th>
              <th className="border px-6 py-3">Edit</th>
              <th className="border px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {user.map((userItem: any) => {
              return (
                <tr key={userItem._id} className="bg-white border-b">
                  <td className="border px-6 py-4">{userItem.name}</td>
                  <td className="border px-6 py-4">{userItem.email}</td>
                  <td className="border px-6 py-4">{userItem.phone}</td>
                  <td className="border px-6 py-4">
                    {format(
                      new Date(userItem.createdAt),
                      "dd/MM/yyyy HH:mm:ss"
                    )}
                  </td>

                  <td className="border px-6 py-4">
                    <div
                      onClick={() =>
                        handleEditProduct(userItem._id, userItem.name)
                      }
                      className="text-2xl flex justify-center text-marian-blue cursor-pointer"
                    >
                      <MdModeEditOutline />
                    </div>
                  </td>
                  <td className="border px-6 py-4">
                    <div
                      onClick={() =>
                        handleOpenDialog(userItem._id, userItem.name)
                      }
                      className="text-2xl flex justify-center text-rose-800 cursor-pointer"
                    >
                      <RiDeleteBin6Line />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHomeUser;
