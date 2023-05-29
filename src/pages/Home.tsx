/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Button from "../components/Button";
import Text from "../components/Text";
import Icon from "../components/icons/Icon";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const images = [
    "https://res.cloudinary.com/dbspz5tmg/image/upload/v1679834660/youtube/2023/march/komorebi-development/young-person-wearing-hoodie-mockup_2_1_jnlzke.png",
    "https://res.cloudinary.com/dbspz5tmg/image/upload/v1679743572/youtube/2023/march/komorebi-development/primaryimage_oblfj9.png",
    "https://res.cloudinary.com/dbspz5tmg/image/upload/v1679743570/youtube/2023/march/komorebi-development/young-person-wearing-hoodie-mockup_1_2_exnour.png",
    "https://specials-images.forbesimg.com/imageserve/63482328920b9ff5cede06a9/Forbes-Best-Men-s-Hoodies/960x0.jpg?fit=scale",
  ];

  const navigateToShop = () => {
    navigate("/shop");
  };

  const getProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log("error in getProducts", error);
      throw error;
    }
  };

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + images.length) % images.length
    );
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative">
      <img
        className="absolute min-h-screen object-cover -top-[102px] -z-10"
        src="https://res.cloudinary.com/dbspz5tmg/image/upload/v1679743571/youtube/2023/march/komorebi-development/young-person-wearing-hoodie-mockup_2_mf5tty.png"
      />
      <div className="mx-[50px] min-h-screen flex flex-col justify-end items-start pb-56">
        <Text variant="heading-two">HOODIE HEAVEN</Text>
        <Button className="mt-7" onClick={navigateToShop}>
          <span className="flex">
            <Icon name="arrow-small-right" />
            <span className="ml-[10px]">Shop now</span>
          </span>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[38px] mt-[75px] mx-auto sm:mx-4 md:mx-8 lg:mx-12 2xl:mt-[300px]">
        {products.map((productItem) => {
          return (
            <div
              key={productItem._id}
              className="flex items-center flex-col justify-center"
            >
              <Text variant="heading-three">{productItem.name}</Text>
              <div className="bg-cream rounded-[18px] p-4 my-[32px]">
                <img
                  width={368}
                  height={368}
                  className="w-[368px] h-[368px] object-cover"
                  src={productItem.image}
                  alt="image"
                />
              </div>
              <Button className="flex" onClick={navigateToShop}>
                <Icon name="arrow-small-right" />
                <span className="ml-[10px]">Shop now</span>
              </Button>
            </div>
          );
        })}
      </div>

      <div className="mt-[100px] mx-[50px] max-w-3xl">
        <Text variant="heading-one">KOMO hoodies</Text>
        <Text variant="body-two" className="mt-7">
          Our hoodies are crafted from high-quality materials and are designed
          to be both comfortable and stylish. We believe that fashion should be
          functional, and our hoodies are the perfect combination of both.
          Whether you're looking for something cozy to wear around the house or
          a statement piece to make a statement out in the world, we have you
          covered
        </Text>
      </div>

      <div className="mt-[82px] mb-[100px] relative h-[768px]">
        {images.map((image, index) => (
          <div key={index}>
            <img
              className={`absolute w-full h-full transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              src={image}
              alt={`Slide ${index}`}
            />
            <button
              className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-zinc-950 opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:opacity-90 motion-reduce:transition-none"
              onClick={prevSlide}
            >
              <span className="inline-block h-8 w-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </span>
            </button>

            <button
              className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-zinc-950 opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:opacity-90 motion-reduce:transition-none"
              onClick={nextSlide}
            >
              <span className="inline-block h-8 w-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            </button>
          </div>
        ))}
        <Button className="absolute bottom-20 left-[30%] sm:left-[40%] md:left-[45%]">
          <span className="flex">
            <Icon name="arrow-small-right" />
            <span className="ml-[10px]">LEARN MORE</span>
          </span>
        </Button>
      </div>
    </section>
  );
};

export default Home;
