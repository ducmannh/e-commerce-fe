/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import AdminHeader from "../AdminHeader";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { listProducts, listUsers } from "../../../redux/storeSlice";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Toaster, toast } from "react-hot-toast";

const AdminHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState<boolean>(false);
  const [id, setId] = React.useState<string>("");
  const [selectAll, setSelectAll] = React.useState<boolean>(false);
  const [selectCkb, setSelectCkb] = React.useState<any[]>([]);
  const [count, setCount] = React.useState<number>(0);
  const [nameUser, setNameUser] = React.useState<string | null>("");
  const products = useSelector((value: any) => value.store.products);
  const name = useSelector((value: any) => value.store.dataName);
  const isAnySelected = selectCkb.length > 0;

  React.useEffect(() => {
    if (name) {
      localStorage.setItem("name", name);
    }
    setNameUser(localStorage.getItem("name"));
  }, [name]);

  React.useEffect(() => {
    axios.get("http://localhost:2304/users").then((res) => {
      dispatch(listUsers(res.data));
    });
  }, []);

  const getProduct = () => {
    axios
      .get("http://localhost:2304/products")
      .then((res) => dispatch(listProducts(res.data)));
  };

  React.useEffect(() => {
    getProduct();
  }, []);

  const handleOpenDialog = (id: string) => {
    setOpen(true);
    setId(id);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:2304/products/${id}`).then((res) => {
      dispatch(listProducts(res.data));
      setOpen(false);
      toast.success("Success deleted");
    });
  };

  const handleEditProduct = (id: string) => {
    navigate(`/admin/update-product/${id}`);
  };

  const handleSearch = (searchInput: string) => {
    if (searchInput) {
      const searchResult = products.filter((item: any) => {
        return item.name.toLowerCase().includes(searchInput.toLowerCase());
      });
      dispatch(listProducts(searchResult));
    } else {
      getProduct();
    }
  };

  const handleSelectedAll = (e: any) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    if (isChecked) {
      const selectedAll = products.map((value: any) => ({ id: value._id }));
      setSelectCkb(selectedAll);
      setCount(products.length);
    } else {
      setSelectCkb([]);
      setCount(0);
    }
  };

  const handleSelectOneCkb = (e: any, productItem: any) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectCkb((prev) => [...prev, { id: productItem._id }]);
      setCount(count + 1);
    } else {
      setSelectCkb((prev) =>
        prev.filter((item) => item.id !== productItem._id)
      );
      setSelectAll(false);
      setCount(count - 1);
    }

    if (count === products.length - 1) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };

  const handleDeleteSelected = () => {
    const newList = products.filter((select: any) =>
      selectCkb.some((item) => item.id === select._id)
    );
    const newListId = newList.map((item: any) => item._id);

    axios
      .delete("http://localhost:2304/products", { data: { ids: newListId } })
      .then((res) => {
        dispatch(listProducts(res.data));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div>
      <AdminHeader handleSearch={handleSearch} />
      <Toaster />

      <div className="text-2xl mx-10 flex flex-col md:flex-row md:justify-between items-center my-6">
        <div className="flex">
          Welcome back, {nameUser}
          <div
            className="underline decoration-blue-800 text-blue-800 ml-5 cursor-pointer"
            onClick={() => navigate("/admin-login")}
          >
            Logout
          </div>
        </div>
        <div className="flex flex-col mt-3 lg:flex-row lg:justify-between">
          <Button
            className="flex items-center lg:mr-5"
            size="small"
            onClick={() => navigate("/admin/create-product")}
          >
            <p className="text-2xl mr-2">
              <IoIosAddCircleOutline />
            </p>
            Add Product
          </Button>
          {isAnySelected && (
            <Button
              className="flex items-center mt-3 lg:mt-0"
              size="small"
              onClick={handleDeleteSelected}
            >
              <p className="m-auto">Delete Product</p>
            </Button>
          )}
        </div>
      </div>

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
              Are you sure you want to delete this product?
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

      <div className="mx-10 mb-10">
        <table className="w-full text-md text-center text-gray-500 table-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr className="hidden lg:table-row">
              <th className="border px-6 py-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  checked={selectAll}
                  onChange={(e) => handleSelectedAll(e)}
                />
              </th>
              <th className="border px-6 py-3">Image</th>
              <th className="border px-6 py-3">Product Name</th>
              <th className="border px-6 py-3">Description</th>
              <th className="border px-6 py-3">Price ($)</th>
              <th className="border px-6 py-3">Created At</th>
              <th className="border px-6 py-3">Edit</th>
              <th className="border px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((productItem: any) => {
              return (
                <tr
                  key={productItem._id}
                  className="bg-white border-b block lg:table-row"
                >
                  <td
                    className="border px-6 py-4 block text-right before:content-[attr(data-title)] before:float-left lg:table-cell"
                    data-title=""
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                      checked={selectCkb.some(
                        (item: any) => item.id === productItem._id
                      )}
                      onChange={(e) => handleSelectOneCkb(e, productItem)}
                    />
                  </td>
                  <td
                    className="border px-6 py-4 block text-right before:content-[attr(data-title)] before:float-left before:font-bold lg:before:hidden lg:table-cell lg:text-center"
                    data-title="Image"
                  >
                    <img
                      src={productItem.image}
                      alt="image"
                      width={100}
                      height={100}
                      className="ml-auto"
                    />
                  </td>
                  <td
                    className="border px-6 py-4 block text-right before:content-[attr(data-title)] before:float-left before:font-bold lg:before:hidden lg:table-cell lg:text-center"
                    data-title="Product Name"
                  >
                    {productItem.name}
                  </td>
                  <td
                    className="border px-6 py-4 block text-right before:content-[attr(data-title)] before:float-left before:font-bold lg:before:hidden lg:table-cell lg:text-left"
                    data-title="Description"
                  >
                    <p className="w-48 sm:w-96 md:w-3/4 lg:w-full ml-auto">
                      {productItem.description}
                    </p>
                  </td>
                  <td
                    className="border px-6 py-4 block text-right before:content-[attr(data-title)] before:float-left before:font-bold lg:before:hidden lg:table-cell lg:text-center"
                    data-title="Price($)"
                  >
                    {productItem.price}
                  </td>
                  <td
                    className="border px-6 py-4 block text-right before:content-[attr(data-title)] before:float-left before:font-bold lg:before:hidden lg:table-cell lg:text-center"
                    data-title="Created At"
                  >
                    {format(
                      new Date(productItem.createdAt),
                      "dd/MM/yyyy HH:mm:ss"
                    )}
                  </td>
                  <td
                    className="border px-6 py-4 block text-right before:content-[attr(data-title)] before:float-left before:font-bold lg:before:hidden lg:table-cell lg:text-center"
                    data-title="Edit"
                  >
                    <div
                      onClick={() => handleEditProduct(productItem._id)}
                      className="text-2xl flex justify-end lg:justify-center text-marian-blue cursor-pointer"
                    >
                      <MdModeEditOutline />
                    </div>
                  </td>
                  <td
                    className="border px-6 py-4 block text-right before:content-[attr(data-title)] before:float-left before:font-bold lg:before:hidden lg:table-cell"
                    data-title="Delete"
                  >
                    <div
                      onClick={() => handleOpenDialog(productItem._id)}
                      className="text-2xl flex justify-end lg:justify-center text-rose-800 cursor-pointer"
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

export default AdminHome;
