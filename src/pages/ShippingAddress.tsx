import Text from "../components/Text";
import { useForm } from "react-hook-form";
import Icon from "../components/icons/Icon";
import clsx from "clsx";
import Button from "../components/Button";
import useGlobalStore from "../store/useGlobalStore";
import { getCartTotal } from "../helpers";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  city: string;
  address: string;
}

interface OrderDetailsType {
  user: {
    name: string;
    email: string;
  };
  deliveryAddress: {
    address: string;
    city: string;
  };
  orderItems: ICartItem[];
}

const ShippingAddress = () => {
  const navigate = useNavigate();
  const { cart, updateClientSecret } = useGlobalStore();
  const cartTotal = getCartTotal(cart);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { address, city, name, email } = getValues();
      const orderDetails: OrderDetailsType = {
        deliveryAddress: {
          address,
          city,
        },
        user: {
          email,
          name,
        },
        orderItems: cart,
      };

      const res = await axios.post("/orders", { ...orderDetails });
      updateClientSecret(res.data.clientSecret);
      navigate("/checkout/payment");
    } catch (error) {
      console.log("error", error);
    }
  });
  return (
    <div className="my-[60px] mx-[50px]">
      <Text variant="heading-three">Shipping Address</Text>
      <div className="grid grid-cols-2 gap-10">
        <form className="max-w-xl">
          {/* Name */}
          <div className="flex flex-col items-start space-y-3 w-full mt-3">
            <label htmlFor="name" className="text-base font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              {...register("name", { required: true, maxLength: 20 })}
              className={clsx(
                "p-5 rounded-[18px] border border-silver w-full",
                {
                  "focus:outline-red focus:ring-red": errors.name,
                }
              )}
            />
            {errors.name && (
              <span className="flex space-x-3">
                <Icon name="exclamation-triangle-icon" />
                <span className="text-red">Required field</span>
              </span>
            )}
          </div>
          {/* Email */}
          <div className="flex flex-col items-start space-y-3 w-full mt-3">
            <label htmlFor="email" className="text-base font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", { required: true, maxLength: 50 })}
              className={clsx(
                "p-5 rounded-[18px] border border-silver w-full",
                {
                  "focus:outline-red focus:ring-red": errors.email,
                }
              )}
            />
            {errors.email && (
              <span className="flex space-x-3">
                <Icon name="exclamation-triangle-icon" />
                <span className="text-red">Required field</span>
              </span>
            )}
          </div>
          {/* City */}
          <div className="flex flex-col items-start space-y-3 w-full mt-3">
            <label htmlFor="city" className="text-base font-semibold">
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="City"
              {...register("city", { required: true, maxLength: 20 })}
              className={clsx(
                "p-5 rounded-[18px] border border-silver w-full",
                {
                  "focus:outline-red focus:ring-red": errors.city,
                }
              )}
            />
            {errors.city && (
              <span className="flex space-x-3 mt-3">
                <Icon name="exclamation-triangle-icon" />
                <span className="text-red">Required field</span>
              </span>
            )}
          </div>
          {/* Address */}
          <div className="flex flex-col items-start space-y-3 w-full mt-3">
            <label htmlFor="address" className="text-base font-semibold">
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              {...register("address", { required: true, maxLength: 60 })}
              className={clsx(
                "p-5 rounded-[18px] border border-silver w-full",
                {
                  "focus:outline-red focus:ring-red": errors.address,
                }
              )}
            />
            {errors.address && (
              <span className="flex space-x-3">
                <Icon name="exclamation-triangle-icon" />
                <span className="text-red">Required field</span>
              </span>
            )}
          </div>
          <div className="flex justify-end mt-7">
            <Button onClick={onSubmit}>CONTINUE TO PAYMENT</Button>
          </div>
        </form>

        <div>
          <div className="space-y-7">
            {cart.map((cartItem) => {
              return (
                <div className="flex items-start" key={cartItem.id}>
                  <img
                    src={cartItem.image}
                    alt="image"
                    width={170}
                    height={170}
                    className="w-[170px] h-[170px] rounded-[18px] mr-[46px]"
                  />
                  <div className="flex justify-between flex-1">
                    <Text variant="subheading-three">{cartItem.name}</Text>
                    <Text variant="subheading-three">
                      $ {cartItem.price} x {cartItem.quantity}{" "}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex justify-between">
            <Text variant="body-two">Subtotal</Text>
            <Text variant="subheading-two">$ {cartTotal}</Text>
          </div>
          <div className="mt-10 flex justify-between">
            <Text variant="body-two">Shipping</Text>
            <Text variant="subheading-two">Free</Text>
          </div>
          <div className="mt-[30px] mb-9 h-[1.8px] bg-black"></div>
          <div className="flex justify-between">
            <Text variant="body-two">Total</Text>
            <Text variant="subheading-two">$ {cartTotal}</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
