/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Text from "../components/Text";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import useGlobalStore from "../store/useGlobalStore";
import { toast } from "react-hot-toast";

const Shop = () => {
  const { addItemToCart } = useGlobalStore();
  const [products, setProducts] = React.useState<IProduct[]>([]);

  const getProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log("error in getProducts", error);
      throw error;
    }
  };

  const handleAddItemToCart = (productItem: any) => {
    const cartItem: RawCartItem = {
      image: productItem.image,
      name: productItem.name,
      price: productItem.price,
      product: productItem._id,
    };
    addItemToCart(cartItem);
    toast.success("Item add to cart");
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <section className="relative w-full flex items-end sm:h-[768px] md:h-[768px]">
        <img
          src="https://res.cloudinary.com/dbspz5tmg/image/upload/v1679743570/youtube/2023/march/komorebi-development/young-person-wearing-hoodie-mockup_1_2_exnour.png"
          alt="image"
          className="absolute -z-10 w-full h-full object-cover aspect-[1.6]"
        />
        <div className="mx-[16px] md:mx-[50px] mb-8 md:mb-40 sm:mb-36">
          <Text variant="heading-three" className="mb-3">
            Lastest hoodie styles online
          </Text>
          <Text variant="body-two">Suit your unique preferences</Text>
        </div>
      </section>

      <section className="mx-[50px] bg-white">
        <Text variant="heading-one" className="mt-[82px]">
          Experience comfort and style
        </Text>
        <Text variant="body-two" className="mb-[80px]">
          Perfect blend of comfort, style, and quality materials
        </Text>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[38px] mb-[180px]">
          {products.map((productItem) => {
            return (
              <div key={productItem._id}>
                <Link to={`/shop/${productItem._id}`}>
                  <div className="rounded-[18px]">
                    <img
                      src={productItem.image}
                      alt="image"
                      width={368}
                      height={368}
                      className="w-[368px] h-[368px]"
                    />
                  </div>
                </Link>
                <Text variant="heading-three" className="mt-7 mb-2">
                  {productItem.name}
                </Text>
                <Text variant="body-three">$ {productItem.price}</Text>
                <Button
                  size="small"
                  className="mt-7"
                  onClick={() => handleAddItemToCart(productItem)}
                >
                  Add to bag
                </Button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Shop;
