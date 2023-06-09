/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../components/icons/Logo";
import "flowbite";
import { BiLogOut } from "react-icons/bi";
import axios from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../../redux/storeSlice";
import avatar from "../../assets/avatar.jpeg"

interface AdminHeaderProps {
  handleSearch: (searchInput: string) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ handleSearch }) => {
  const [searchInput, setSearchInput] = React.useState("");
  const [nameUser, setNameUser] = React.useState<string | null>("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector((value: any) => value.store.dataName);
  const isActiveProduct = location.pathname === "/admin-products";
  const isActiveOrder = location.pathname === "/admin-orders";
  const isActiveUser = location.pathname === "/admin-users";

  const handleSearchInput = () => {
    handleSearch(searchInput);
  };

  React.useEffect(() => {
    axios.get("/users").then((res) => {
      dispatch(listUsers(res.data));
    });
  }, []);

  React.useEffect(() => {
    if (name) {
      localStorage.setItem("name", name);
    }
    setNameUser(localStorage.getItem("name"));
  }, [name]);

  return (
    <nav className="bg-zinc-200 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={"/"}>
          <Logo />
        </Link>
        <div className="flex md:order-2">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 mr-1"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
              onChange={(e: any) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchInput();
                }
              }}
            />
          </div>
          <button
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="flex items-center justify-around">
            <img
              src={avatar}
              alt="avatar"
              className="w-10 rounded-full ml-4"
            />
            <p className="ml-2 mr-2 sm:mr-5 md:mr-8">{nameUser}</p>
            <div
              className="text-3xl cursor-pointer"
              onClick={() => navigate("/admin-login")}
            >
              <BiLogOut />
            </div>
          </div>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-search"
        >
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
              onChange={(e: any) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchInput();
                }
              }}
            />
          </div>
          <ul className="flex flex-col p-4 mt-4 font-medium md:flex-row md:space-x-8 md:mt-0 md:flex md:justify-end">
            <li>
              <a
                href="/admin-products"
                className={`block py-2 pl-3 pr-4 text-gray-900 rounded md:bg-transparent md:p-0 hover:text-blue-700 ${
                  isActiveProduct ? "text-indigo-600" : ""
                }`}
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="/admin-orders"
                className={`block py-2 pl-3 pr-4 text-gray-900 rounded md:bg-transparent md:p-0 hover:text-blue-700 ${
                  isActiveOrder ? "text-indigo-600" : ""
                }`}
              >
                Orders
              </a>
            </li>
            <li>
              <a
                href="/admin-users"
                className={`block py-2 pl-3 pr-4 text-gray-900 rounded md:bg-transparent md:p-0 hover:text-blue-700 ${
                  isActiveUser ? "text-indigo-600" : ""
                }`}
              >
                Users
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
