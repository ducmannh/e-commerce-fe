/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../../redux/storeSlice";
import { toast, Toaster } from "react-hot-toast";
import Button from "../../components/Button";
import Text from "../../components/Text";
import { Link, useNavigate } from "react-router-dom";

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

const AdminRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((value: any) => value.store.user);

  const onSubmit = (data: FormData) => {
    const existingUserName = user.find(
      (userItem: any) => userItem.name === data.name
    );

    if (existingUserName) {
      toast.error("User already exists");
      return;
    }

    axios.post("http://localhost:2304/users", data).then((res) => {
      dispatch(listUsers(res.data));
      toast.success("Register success");
    });

    navigate("/admin-login");
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:2304/users")
      .then((res) => dispatch(listUsers(res.data)));
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center h-screen"
    >
      <div className="border-2 border-zinc-950 rounded-lg p-8">
        <Text variant="body-one" className="mb-14 text-center">
          REGISTER
        </Text>
        <div className="flex items-center mb-2">
          <label htmlFor="name" className="w-64 text-lg text-gray-900">
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="User name"
          />
        </div>
        <p className="text-rose-600 text-sm flex justify-end mb-3">
          {errors.name?.message}
        </p>

        <div className="flex items-center mb-2">
          <label htmlFor="email" className="w-64 text-lg text-gray-900">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Password"
          />
        </div>
        <p className="text-rose-600 text-sm flex justify-end mb-3">
          {errors.password?.message}
        </p>

        <div className="flex items-center mb-2">
          <label htmlFor="username" className="w-64 text-lg text-gray-900">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Confirm Password"
          />
        </div>
        <p className="text-rose-600 text-sm flex justify-end mb-3">
          {errors.confirmPassword?.message}
        </p>

        <div className="flex items-center mb-2">
          <label htmlFor="email" className="w-64 text-lg text-gray-900">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Email"
          />
        </div>
        <p className="text-rose-600 text-sm flex justify-end mb-3">
          {errors.email?.message}
        </p>

        <div className="flex items-center mb-2">
          <label htmlFor="phone" className="w-64 text-lg text-gray-900">
            Phone
          </label>
          <input
            {...register("phone")}
            type="number"
            id="phone"
            className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Phone number"
          />
        </div>
        <p className="text-rose-600 text-sm flex justify-end mb-3">
          {errors.phone?.message}
        </p>

        <div className="flex justify-end mt-14">
          <Button type="submit" size="large">
            Register
          </Button>
        </div>
        <Toaster />

        <div className="flex justify-center mt-8">
          <Text variant="body-two">
            You have account? 
            <Link
              to={"/admin-login"}
              className="underline decoration-blue-800 text-blue-800 ml-2"
            >
              Login
            </Link>
          </Text>
        </div>
      </div>
    </form>
  );
};

export default AdminRegister;
