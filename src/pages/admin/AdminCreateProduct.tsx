/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/Button";
import Text from "../../components/Text";
import axios from "axios";
import { useDispatch } from "react-redux";
import { listProducts } from "../../redux/storeSlice";
import { toast, Toaster } from "react-hot-toast";

interface Inputs {
  image: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
}

const AdminCreateProduct = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (
        data.image &&
        data.name &&
        data.description &&
        data.price &&
        data.createdAt
      ) {
        const res = await axios.post("http://localhost:2304/products", data);
        dispatch(listProducts(res.data));
        toast.success("Added products success");
        reset();
      } else {
        toast.error("Please enter enough information");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="bg-zinc-50 w-1/2 rounded-lg shadow-2xl">
            <div className="p-8">
              <Text variant="body-one" className="text-center mb-7">
                ADD PRODUCT
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
              <Button type="submit" size="small" className="w-1/3">
                Add product
              </Button>
              <Button type="button" size="small" className="w-1/3">
                <a href={"/admin"}>Back</a>
              </Button>
            </div>
          </div>
        </div>
        <Toaster />
      </form>
    </div>
  );
};

export default AdminCreateProduct;
