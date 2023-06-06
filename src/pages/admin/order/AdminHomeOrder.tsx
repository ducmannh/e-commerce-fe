/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import AdminHeader from "../AdminHeader";
import axios from "../../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../../../redux/storeSlice";
import { format } from "date-fns";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";

const AdminHomeOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState<boolean>(false);
  const [id, setId] = React.useState<string>("");
  const [selectAll, setSelectAll] = React.useState<boolean>(false);
  const [selectCkb, setSelectCkb] = React.useState<any[]>([]);
  const [count, setCount] = React.useState<number>(0);
  const order = useSelector((value: any) => value.store.order);
  const name = localStorage.getItem("name");
  const isAnySelected = selectCkb.length > 0;

  const getOrders = () => {
    axios.get("/orders").then((res) => {
      dispatch(listOrders(res.data));
    });
  };

  const handleSearch = (searchInput: string) => {
    if (searchInput) {
      const searchResult = order.filter((value: any) => {
        return (
          value.user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.deliveryAddress.address
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          value.deliveryAddress.city
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        );
      });
      dispatch(listOrders(searchResult));
    } else {
      getOrders();
    }
  };

  const handleOpenDialog = (id: string) => {
    setOpen(true);
    setId(id);
  };

  const handleDelete = () => {
    axios.delete(`/orders/${id}`).then((res) => {
      dispatch(listOrders(res.data));
      setOpen(false);
      toast.success("Success deleted");
    });
  };

  const handleSelectedAll = (e: any) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    if (isChecked) {
      const selectedAll = order.map((value: any) => ({ id: value._id }));
      setSelectCkb(selectedAll);
      setCount(order.length);
    } else {
      setSelectCkb([]);
      setCount(0);
    }
  };

  const handleSelectOneCkb = (e: any, orderItem: any) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectCkb((prev) => [...prev, { id: orderItem._id }]);
      setCount(count + 1);
      if (count === order.length - 1) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }
    } else {
      setSelectCkb((prev) => prev.filter((item) => item.id !== orderItem._id));
      setSelectAll(false);
      setCount(count - 1);
    }
  };

  const handleDeleteSelected = () => {
    const newList = order.filter((select: any) =>
      selectCkb.some((item) => item.id === select._id)
    );
    const newListId = newList.map((item: any) => item._id);

    axios
      .delete("/orders", { data: { ids: newListId } })
      .then((res) => {
        dispatch(listOrders(res.data));
        setSelectCkb([])
        setCount(0)
        toast.success("Delete orders success")
      });
  };

  React.useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <AdminHeader handleSearch={handleSearch} />
      <Toaster />

      <div className="text-2xl mx-10 flex flex-col items-center my-6 md:flex-row">
        <div className="flex-grow">
          <div className="flex my-5">
            Welcome back, {name}
            <div
              className="underline decoration-blue-800 text-blue-800 ml-5 cursor-pointer"
              onClick={() => navigate("/admin-login")}
            >
              Logout
            </div>
          </div>
        </div>
        {isAnySelected && (
          <Button
            className="flex items-center"
            size="small"
            onClick={handleDeleteSelected}
          >
            <p>Delete Orders</p>
          </Button>
        )}
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
              Are you sure you want to delete this order?
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
          <thead className="text-xs text-gray-700 uppercase bg-gray-300">
            <tr className="hidden lg:table-row">
              <th className="border border-zinc-950 px-6 py-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  checked={selectAll}
                  onChange={(e) => handleSelectedAll(e)}
                />
              </th>
              <th className="border border-zinc-950 px-6 py-3">Name</th>
              <th className="border border-zinc-950 px-6 py-3">Email</th>
              <th className="border border-zinc-950 px-6 py-3">Address</th>
              <th className="border border-zinc-950 px-6 py-3">City</th>
              <th className="border border-zinc-950 px-6 py-3">Products, Quantity</th>
              <th className="border border-zinc-950 px-6 py-3">Total ($)</th>
              <th className="border border-zinc-950 px-6 py-3">Status</th>
              <th className="border border-zinc-950 px-6 py-3">Order At</th>
              <th className="border border-zinc-950 px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {order.map((value: any) => {
              const orderUsers = value.user;
              const orderAddress = value.deliveryAddress;
              const orderItems = value.orderItems;
              const orderPayments = value.paymentDetails;

              return (
                <tr key={value._id} className="even:bg-slate-200">
                  <td
                    className="border border-zinc-950 px-6 py-4 block text-right before:content-[attr(data-title)] before:float-left lg:before:hidden lg:table-cell lg:text-center"
                    data-title=""
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                      checked={selectCkb.some(
                        (item: any) => item.id === value._id
                      )}
                      onChange={(e) => handleSelectOneCkb(e, value)}
                    />
                  </td>
                  <td
                    className="border border-zinc-950 px-6 py-4 block text-right before:content-[attr(data-title)] before:float-left before:font-bold lg:before:hidden lg:table-cell lg:text-center"
                    data-title="Name"
                  >
                    {orderUsers.name}
                  </td>
                  <td
                    className="border border-zinc-950 px-6 py-4 block text-right before:content-[attr(data-title)] before:float-left before:font-bold lg:before:hidden lg:table-cell lg:text-center"
                    data-title="Email"
                  >
                    {orderUsers.email}
                  </td>
                  <td
                    className="border border-zinc-950 px-6 py-4 block text-right before:content-[attr(data-title)] before:float-left before:font-bold lg:before:hidden lg:table-cell lg:text-center"
                    data-title="Address"
                  >
                    {orderAddress.address}
                  </td>
                  <td
                    className="border border-zinc-950 px-6 py-4 block text-right before:content-[attr(data-title)] before:float-left before:font-bold lg:before:hidden lg:table-cell lg:text-center"
                    data-title="City"
                  >
                    {orderAddress.city}
                  </td>
                  <td
                    className="border border-zinc-950 px-6 py-4 block text-right before:content-[attr(data-title)] before:float-left before:font-bold lg:before:hidden lg:table-cell lg:text-center"
                    data-title="Products, Quantity"
                  >
                    {orderItems.map((item: any, index: number) => {
                      return (
                        <div key={index} className="flex justify-end lg:justify-between">
                          <div className="sm:mr-1">{item.name}</div>
                          <div>
                            <span className="text-rose-700 font-bold text-md sm:mr-1">
                              x
                            </span>
                            {item.quantity}
                          </div>
                        </div>
                      );
                    })}
                  </td>
                  <td
                    className="border border-zinc-950 px-6 py-4 block text-right before:content-[attr(data-title)] before:float-left before:font-bold lg:before:hidden lg:table-cell lg:text-center"
                    data-title="Total ($)"
                  >
                    {orderPayments.amount / 100}
                  </td>
                  <td
                    className="border border-zinc-950 px-6 py-4 block text-right before:content-[attr(data-title)] before:float-left before:font-bold lg:before:hidden lg:table-cell lg:text-center"
                    data-title="Status"
                  >
                    {value.paymentStatus}
                  </td>
                  <td
                    className="border border-zinc-950 px-6 py-4 block text-right before:content-[attr(data-title)] before:float-left before:font-bold lg:before:hidden lg:table-cell lg:text-center"
                    data-title="Order At"
                  >
                    {format(new Date(value.createdAt), "dd/MM/yyyy HH:mm:ss")}
                  </td>
                  <td
                    className="border border-zinc-950 px-6 py-4 block text-right before:content-[attr(data-title)] before:float-left before:font-bold lg:before:hidden lg:table-cell lg:text-center"
                    data-title="Delete"
                  >
                    <div
                      onClick={() => handleOpenDialog(value._id)}
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

export default AdminHomeOrder;
