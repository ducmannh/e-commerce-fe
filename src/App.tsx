import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Root from "./routes/Root";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import ShippingAddress from "./pages/ShippingAddress";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminHome from "./pages/admin/product/AdminHome";
import AdminCreateProduct from "./pages/admin/product/AdminCreateProduct";
import AdminUpdateProduct from "./pages/admin/product/AdminUpdateProduct";
import AdminHomeOrder from "./pages/admin/order/AdminHomeOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shop/:id",
        element: <ProductDetails />,
      },
      {
        path: "/checkout/shipping",
        element: <ShippingAddress />,
      },
      {
        path: "/checkout/payment",
        element: <Payment />,
      },
      {
        path: "/success",
        element: <Success />,
      },
    ],
  },
  {
    path: "/admin-register",
    element: <AdminRegister />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/admin-products",
    element: <AdminHome />,
  },
  {
    path: "/admin/create-product",
    element: <AdminCreateProduct />,
  },
  {
    path: "/admin/update-product/:id",
    element: <AdminUpdateProduct />,
  },
  {
    path: "/admin-orders",
    element: <AdminHomeOrder />,
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
