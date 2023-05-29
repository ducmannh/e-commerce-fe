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
    <section className="mx-[50px]">
      <Text variant="heading-one" className="my-[82px]">
        Shopping Cart
      </Text>
      <div className="space-y-[164px] ml-14">
        {cart.map((cartItem) => {
          return (
            <div key={cartItem.id} className="flex items-start justify-between">
              <img
                src={cartItem.image}
                width={378}
                height={378}
                className="w-[378px] h-[378px] rounded-[18px] mr-[46px]"
                alt="image"
              />

              <div className="flex flex-col w-full justify-between">
                <div className="flex justify-between">
                  <Text variant="subheading-two">{cartItem.name}</Text>
                  <Text variant="subheading-two" className="mr-32">
                    $ {cartItem.price}
                  </Text>
                </div>

                <div className="mt-[124px] flex items-center space-x-7">
                  <button
                    onClick={() => {
                      removeItemFromCart(cartItem);
                      toast.success("Item remove");
                    }}
                  >
                    <Icon name="minus-icon" />
                  </button>
                  <span>{cartItem.quantity}</span>
                  <button onClick={() => handleAddItemToCart(cartItem)}>
                    <Icon name="plus-icon" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="my-[82px]">
        <div className="border-[1.8px] border-black"></div>
      </div>

      <div className="flex items-center justify-between mb-[82px] ml-14">
        <Text variant="subheading-two">Subtotal</Text>
        <Text variant="subheading-two" className="mr-32">
          USD ${cartTotal}
        </Text>
      </div>
      <Button
        className="mb-[100px] w-full"
        size="large"
        onClick={() => {
          navigate("/checkout/shipping");
        }}
      >
        Proceed to Check out
      </Button>
    </section>
  );
};

export default Cart;
