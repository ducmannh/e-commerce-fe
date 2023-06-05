/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import Text from "../components/Text";
import Button from "../components/Button";
import useGlobalStore from "../store/useGlobalStore";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState<IProduct>();
  const { addItemToCart } = useGlobalStore();

  const handleAddItemToCart = () => {
    if (!product) {
      return;
    }
    const cartItem: RawCartItem = {
      image: product?.image,
      name: product?.name,
      price: product?.price,
      product: product?._id,
    };
    addItemToCart({ ...cartItem });
  };

  const getProduct = async () => {
    try {
      const res = await axios.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log("error in getProduct", error);
      throw error;
    }
  };

  React.useEffect(() => {
    getProduct();
  }, []);

  return (
    <section className="mt-[82px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-[180px] gap-10 mx-[50px]">
        <div>
          <img
            src={product?.image}
            alt="image"
            className="h-[300px] lg:h-[618px] object-cover m-auto"
          />
        </div>

        <div>
          <Text variant="heading-one" className="text-center">{product?.name}</Text>
          <Text variant="subheading-one" className="my-7 text-center">
            $ {product?.price}
          </Text>
          <Text variant="body-two">{product?.description}</Text>
          <Button size="small" className="mt-14 w-full" onClick={handleAddItemToCart}>
            ADD TO BAG
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
