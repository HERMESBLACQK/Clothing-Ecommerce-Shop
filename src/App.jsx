import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  About,
  Cart,
  Contact,
  HomeLayout,
  Landing,
  Login,
  Register,
  Shop,
  SingleProduct,
  Wishlist,
  Profile,
  Search,
  ThankYou,
  OrderHistory
} from "./pages";
import OrdersList from './admin/Orders';
import SingleOrderDetails from './admin/SingleOrderDetails';
import UserList from './admin/UserList';  
import UserDetails from './admin/UserDetails';
import CreateProduct from './admin/CreateProduct';
import ProductList from './admin/ProductList';
import ProductDetails from "./admin/ProductDetails";
import AdminDashboard from "./admin/AdminDashboard";
import { landingLoader } from "./pages/Landing";
import { singleProductLoader } from "./pages/SingleProduct";
import { shopLoader } from "./pages/Shop";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
      },
      {
        path: "shop",
        element: <Shop />,
        loader: shopLoader

      },
      {
        path: "shop/product/:id",
        element: <SingleProduct />,
        loader: singleProductLoader,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about-us",
        element: <About />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "user-profile",
        element: <Profile />,
      },
      {
        path:"search",
        element: <Search />
      },
      {
        path:"thank-you",
        element: <ThankYou />
      },
      {
        path:"order-history",
        element: <OrderHistory />
      },
      {
        path:"Orders",
        element: <OrdersList />
      },
      {
        path:"/SingleOrderDetails/:id",
        element: <SingleOrderDetails/>

      },
      {
        path:"/UserList",
        element: <UserList/>

      },
      {
        path: "/UserDetails/:userId", // Dynamic route parameter for userId
        element: <UserDetails />,
      },
      {
        path: "/CreateProduct", // Dynamic route parameter for userId
        element: <CreateProduct />,
      },
      {
        path: "/ProductList", // Dynamic route parameter for userId
        element: <ProductList />,
      },
      {
        path: "/ProductDetails/:id", // Dynamic route parameter for userId
        element: <ProductDetails />,
      },
      {
        path: "/AdminDashboard", // Dynamic route parameter for userId
        element: <AdminDashboard />,
      },

    ],
  },
]);

function App() {

  const orders = []; // Assuming orders is an array
  const cancelOrder = () => {}; // Placeholder function
  const handleTrackOrder = () => {}; // Placeholder function

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
