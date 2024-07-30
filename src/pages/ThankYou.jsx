import React, { useEffect } from "react";
import { SectionTitle } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../store";
import { calculateTotals, clearCart } from "../features/cart/cartSlice";

const ThankYou = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveToOrderHistory = async () => {
    try {
      await axios.post("https://json-server-main-yeqa.onrender.com/orders", {
        userId: localStorage.getItem("id"),
        orderStatus: "Ordered",
        subtotal: total,
        cartItems: cartItems,
      });
    } catch (err) {
      toast.error(err.response);
    }
  };

  useEffect(() => {
    if (!loginState) {
      toast.error("You must be logged in to access this page");
      navigate("/");
    } else if (cartItems.length > 0) {
      saveToOrderHistory();
      store.dispatch(clearCart());
      store.dispatch(calculateTotals());
      toast.success("Order completed");
    }
  }, [loginState, cartItems, navigate]);

  return (
    <>
      <SectionTitle title="Thank You" path="Home | Cart | Thank You" />
      <div className="thankyou-content text-center text-accent-content mt-8 p-8 max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="text-5xl font-bold text-gray-800 max-sm:text-3xl">
          Thank you for your purchase!
        </h2>
        <p className="text-lg text-gray-600 mt-6 max-sm:text-md">
          We hope you love your new clothes and shoes! We appreciate your business and look forward to seeing you again soon.
        </p>
        <p className="text-lg text-gray-600 mt-4 max-sm:text-md">
          Here are some things you can do next:
        </p>
        <ul className="text-lg text-red-600 mt-6 max-sm:text-md">
          <li className="mb-4">
            <Link to="/order-history">
              <button className="btn bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 py-2 px-4 rounded-lg">
                See order history
              </button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <button className="btn bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 py-2 px-4 rounded-lg">
                Browse and buy more
              </button>
            </Link>
          </li>
        </ul>
        <p className="text-lg text-gray-600 mt-6 max-sm:text-md">
          Thank you again for your purchase!
        </p>
        <p className="text-lg text-gray-600 mt-2 max-sm:text-md">
          Sincerely, The Cabs Store team
        </p>
      </div>
    </>
  );
};

export default ThankYou;
