import useGlobalStore from "../store/useGlobalStore";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { getCartTotal } from "../helpers";
import Text from "../components/Text";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const { clientSecret, cart } = useGlobalStore();
  const cartTotal = getCartTotal(cart);

  const options: StripeElementsOptions = {
    clientSecret,
  };

  return (
    <div className="mx-[50px] my-[82px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-28">
        <div className="">
          <div className="space-y-7">
            {cart.map((cartItem) => {
              return (
                <div className="md:flex md:items-start md:justify-between" key={cartItem.id}>
                  <img
                    src={cartItem.image}
                    width={170}
                    height={170}
                    className="w-[170px] h-[170px] rounded-[18px] m-auto"
                    alt="image"
                  />
                  <div className="flex justify-between flex-1 mt-5 sm:justify-evenly md:justify-between md:ml-7">
                    <Text variant="subheading-two">{cartItem.name}</Text>
                    <Text variant="subheading-two">
                      $ {cartItem.price} x {cartItem.quantity}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex justify-between sm:justify-evenly md:justify-between">
            <Text variant="body-two">Subtotal</Text>
            <Text variant="subheading-two">$ {cartTotal}</Text>
          </div>
          <div className="mt-10 flex justify-between sm:justify-evenly md:justify-between">
            <Text variant="body-two">Shipping</Text>
            <Text variant="subheading-two">Free</Text>
          </div>
          <div className="mt-[30px] mb-9 h-[1.8px] bg-black"></div>
          <div className="flex justify-between sm:justify-evenly md:justify-between">
            <Text variant="body-two">Total</Text>
            <Text variant="subheading-two">$ {cartTotal}</Text>
          </div>
        </div>

        <div className="max-w-2xl">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
