/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Button from "../../../components/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import Text from "../../../components/Text";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { listUsers } from "../../../redux/storeSlice";
import { Toaster, toast } from "react-hot-toast";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .min(5, "Password must be at least 5 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])/,
        "Password must contain at least one uppercase letter and one number"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password must match")
      .required(),
    phone: yup
      .string()
      .test(
        "phone",
        "Phone number must be exactly 10 digits",
        (value: any) => value && value.length === 10
      )
      .required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const AdminUpdateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit = async (data: FormData) => {
    axios.put(`http://localhost:2304/users/${id}`, data).then((res) => {
      dispatch(listUsers(res.data));
      toast.success("Updated success, You will be redirected to the login page after 5s");
      setTimeout(() => {
        navigate("/admin-login");
      }, 3000);
    });
  };

  React.useEffect(() => {
    axios.get(`http://localhost:2304/users/${id}`).then((res) => {
      const { name, password, confirmPassword, email, phone } = res.data;
      setValue("name", name);
      setValue("password", password);
      setValue("confirmPassword", confirmPassword);
      setValue("email", email);
      setValue("phone", phone);
    });
  }, [setValue, id]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="bg-zinc-50 w-1/2 rounded-lg shadow-2xl">
            <div className="p-8">
              <Text variant="body-one" className="text-center mb-3">
                UPDATE USER
              </Text>
              <div className="flex items-center mb-3">
                <label htmlFor="name" className="w-48 text-lg text-gray-900">
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 cursor-not-allowed opacity-60"
                  disabled={true}
                />
              </div>

              <div className="flex items-center mb-3">
                <label
                  htmlFor="password"
                  className="w-48 text-lg text-gray-900"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  type="text"
                  id="password"
                  className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <p className="text-rose-600 text-sm flex justify-end mb-3">
                {errors.password?.message}
              </p>

              <div className="flex items-center mb-3">
                <label
                  htmlFor="confirmPassword"
                  className="w-48 text-lg text-gray-900"
                >
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword")}
                  type="text"
                  id="confirmPassword"
                  className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <p className="text-rose-600 text-sm flex justify-end mb-3">
                {errors.confirmPassword?.message}
              </p>

              <div className="flex items-center mb-3">
                <label htmlFor="email" className="w-48 text-lg text-gray-900">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <p className="text-rose-600 text-sm flex justify-end mb-3">
                {errors.email?.message}
              </p>

              <div className="flex items-center mb-3">
                <label htmlFor="phone" className="w-48 text-lg text-gray-900">
                  Phone
                </label>
                <input
                  {...register("phone")}
                  type="number"
                  id="phone"
                  className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <p className="text-rose-600 text-sm flex justify-end mb-3">
                {errors.phone?.message}
              </p>
            </div>
            <div className="flex justify-between p-4">
              <Button type="submit" size="small" className="w-1/3">
                Update User
              </Button>
              <Button type="button" size="small" className="w-1/3">
                <Link to={"/admin-users"}>Back</Link>
              </Button>
            </div>
          </div>
        </div>
        <Toaster />
      </form>
    </div>
  );
};

export default AdminUpdateUser;
