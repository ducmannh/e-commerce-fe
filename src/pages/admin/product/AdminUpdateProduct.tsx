import { Toaster } from "react-hot-toast";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { listProducts } from "../../../redux/storeSlice";

interface Inputs {
  image: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
}

const AdminUpdateProduct = () => {
  const { register, handleSubmit, setValue } = useForm<Inputs>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    axios.put(`http://localhost:2304/products/${id}`, data).then((res) => {
      dispatch(listProducts(res.data));
      navigate("/admin-products");
    });
  };

  React.useEffect(() => {
    axios
      .get(`http://localhost:2304/products/${id}`)
      .then((res) => {
        const { image, name, description, price, createdAt } = res.data;
        setValue("image", image);
        setValue("name", name);
        setValue("description", description);
        setValue("price", price);
        setValue("createdAt", format(new Date(createdAt), "yyyy-MM-dd"));
      })
      .catch((error) => console.log("error", error));
  }, [setValue, id]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="bg-zinc-50 w-full md:w-3/4 2xl:w-1/2 rounded-lg shadow-2xl mx-5">
            <div className="p-8">
              <Text variant="body-one" className="text-center mb-7">
                UPDATE PRODUCT
              </Text>
              <div className="flex items-center mb-7">
                <label htmlFor="image" className="w-48 text-lg text-gray-900">
                  Image
                </label>
                <input
                  {...register("image")}
                  type="text"
                  id="image"
                  className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Image"
                />
              </div>
              <div className="flex items-center mb-7">
                <label htmlFor="product" className="w-48 text-lg text-gray-900">
                  Product name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="product"
                  className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Product name"
                />
              </div>
              <div className="flex items-center mb-7">
                <label
                  htmlFor="description"
                  className="w-48 text-lg text-gray-900"
                >
                  Description
                </label>
                <input
                  {...register("description")}
                  type="text"
                  id="description"
                  className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Description"
                />
              </div>
              <div className="flex items-center mb-7">
                <label htmlFor="price" className="w-48 text-lg text-gray-900">
                  Price
                </label>
                <input
                  {...register("price")}
                  type="number"
                  id="price"
                  className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Price"
                />
              </div>
              <div className="flex items-center mb-7">
                <label
                  htmlFor="createAt"
                  className="w-48 text-lg text-gray-900"
                >
                  Create At
                </label>
                <input
                  {...register("createdAt")}
                  type="date"
                  id="createAt"
                  className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Create At"
                />
              </div>
            </div>
            <div className="flex justify-between p-4">
              <Button type="submit" size="small" className="">
                Update product
              </Button>
              <Button type="button" size="small" className="w-44">
                <Link to={"/admin-products"}>Back</Link>
              </Button>
            </div>
          </div>
        </div>
        <Toaster />
      </form>
    </div>
  );
};

export default AdminUpdateProduct;
