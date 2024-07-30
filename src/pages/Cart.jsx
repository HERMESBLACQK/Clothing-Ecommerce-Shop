import React, { useEffect, useState } from 'react';
import "../index.css"
import { CartItemsList, CartTotals, SectionTitle } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import AddressSave from "../components/AddressSave";

const CartHeader = () => {
  return (
    <SectionTitle title="Cart" path="Home | Cart" />
  );
};

const CartFooter = ({ cartItemList, userAddressList, loginState, navigate }) => {
  const handleOrderNow = () => {
    if (cartItemList.length === 0) {
      toast.error('Your cart is empty. Go to the shop to get the best products.');
      navigate('/shop'); // Redirect to shop page
    } else {
      navigate('/thank-you'); // Proceed to order confirmation page
    }
  };

  return (
    <div className="lg:col-span-4 lg:pl-4">
      <CartTotals />
      {loginState ? (
        <button onClick={handleOrderNow} className="btn bg-[#dc0000] hover:bg-[#ffcc00] text-white btn-block mt-8">
          Order Now
        </button>
      ) : (
        <Link to="/login" className="btn bg-[#dc0000] hover:bg-[#ffcc00] btn-block text-white mt-8">
          Please Login
        </Link>
      )}
      <div className="grid grid-cols-1 max-lg:grid-cols-1 mt-10 m-auto w-[100%] max-sm:w-[95%] gap-3">
        <AddressSave addressType="address1" />
        <AddressSave addressType="address2" />
      </div>
    </div>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const cartItemList = useSelector((state) => state.cart.cartItems);
  const userAddressList = useSelector((state) => state.auth.userAddresses);

  useEffect(() => {
    const fetchUserAddresses = async () => {
      try {
        if (loginState && userAddressList) {
          // Fetch user data with addresses
          const response = await axios.get(`https://json-server-main-yeqa.onrender.com/user/${userAddressList.id}`);
          const addresses = response.data.addresses || [];
          setUserAddressList(addresses);
        }
      } catch (error) {
        console.error('Error fetching user addresses:', error);
      }
    };

    fetchUserAddresses();
  }, [loginState, userAddressList, navigate]);

  return (
    <>
      <CartHeader />
      <div className="mt-8 grid gap-8 lg:grid-cols-12 max-w-7xl mx-auto px-10">
        <div className="lg:col-span-8 h-[600px] overflow-y-scroll rounded-md custom-scrollbar">
          <CartItemsList />
        </div>
        <CartFooter
          cartItemList={cartItemList}
          userAddressList={userAddressList}
          loginState={loginState}
          navigate={navigate}
        />
      </div>
    </>
  );
};

export default Cart;
