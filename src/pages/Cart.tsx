import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Text from "../components/Text";
import Icon from "../components/icons/Icon";
import { getCartTotal } from "../helpers";
import useGlobalStore from "../store/useGlobalStore";
import { toast } from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, addItemToCart, removeItemFromCart } = useGlobalStore();
  const cartTotal = getCartTotal(cart);

  const handleAddItemToCart = (cartItem: ICartItem) => {
    addItemToCart({
      image: cartItem.image,
      name: cartItem.name,
      price: cartItem.price,
      product: cartItem.product,
    });
    toast.success("Item add");
  };

  return (
    <section className="md:mx-[50px]">
      <Text
        variant="heading-one"
        className="my-[60px] text-center md:my-[82px]"
      >
        Shopping Cart
      </Text>
      <div className="mx-7 md:space-y-[164px] md:ml-14">
        {cart.map((cartItem) => {
          return (
            <div
              key={cartItem.id}
              className="mt-10 md:flex md:items-start md:justify-between"
            >
              <img
                src={cartItem.image}
                width={378}
                height={378}
                className="w-[378px] h-[378px] rounded-[18px] m-auto md:mr-10"
                alt="image"
              />

              <div className="flex flex-col w-full justify-between">
                <div className="flex justify-between">
                  <Text variant="subheading-one">{cartItem.name}</Text>
                  <Text variant="subheading-one" className="2xl:mr-32">
                    $ {cartItem.price}
                  </Text>
                </div>

                <div className="mt-4 flex items-center justify-end space-x-7 md:mt-[124px] md:justify-start">
                  <button
                    onClick={() => {
                      removeItemFromCart(cartItem);
                      toast.success("Item remove");
                    }}
                  >
                    <Icon name="minus-icon" />
                  </button>
                  <span className="text-2xl">{cartItem.quantity}</span>
                  <button onClick={() => handleAddItemToCart(cartItem)}>
                    <Icon name="plus-icon" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="my-[50px] md:my-[82px]">
        <div className="border-[1.8px] border-black"></div>
      </div>

      <div className="flex items-center justify-between mb-[82px] ml-14">
        <Text variant="subheading-one">Subtotal</Text>
        <Text variant="subheading-one" className="mr-6 2xl:mr-32">
          USD ${cartTotal}
        </Text>
      </div>
      <div className="flex justify-center items-center">
        <Button
          className="mb-[100px] w-full mx-5"
          size="large"
          onClick={() => {
            navigate("/checkout/shipping");
          }}
        >
          Proceed to Check out
        </Button>
      </div>
    </section>
  );
};

export default Cart;
