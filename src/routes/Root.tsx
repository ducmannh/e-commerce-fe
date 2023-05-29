import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast"
import Header from "../components/Header";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Toaster />
    </>
  );
};

export default Root;
