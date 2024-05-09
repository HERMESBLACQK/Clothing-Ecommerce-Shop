import React, { useEffect, useState } from 'react';
import { CartItemsList, CartTotals, SectionTitle } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import AddressSave from "../components/AddressSave";


const Cart = () => {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const { cartItems } = useSelector((state) => state.cart);
  const { userData } = useSelector((state) => state.auth);

  const [userAddresses, setUserAddresses] = useState([]);

  useEffect(() => {
    const fetchUserAddresses = async () => {
      try {
        if (loginState && userData) {
          // Fetch user data with addresses
          const response = await axios.get(`https://json-server-main-yeqa.onrender.com/user/${userData.id}`);
          const addresses = response.data.addresses || [];
          setUserAddresses(addresses);
          
          // Check if user addresses are empty
          if (addresses.length === 0) {
            toast.error('Please set your address before placing an order');
            navigate('/user-profile'); // Redirect to profile page to set address
          } else {
            console.log('User Addresses:', addresses); // Log user addresses
          }
        }
      } catch (error) {
        console.error('Error fetching user addresses:', error);
      }
    };
  
    fetchUserAddresses();
  }, [loginState, userData, navigate]);
  

  const isCartEmpty = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty. Go to the shop to get the best products.');
      navigate('/shop'); // Redirect to shop page
    } else {
      navigate('/thank-you'); // Proceed to order confirmation page
    }
  };

  return (
    <>
      <SectionTitle title="Cart" path="Home | Cart" />
      <div className='mt-8 grid gap-8 lg:grid-cols-12 max-w-7xl mx-auto px-10'>
        <div className='lg:col-span-8 h-[500px] overflow-y-scroll'>
          <CartItemsList />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotals />
          {loginState ? (
            <button onClick={isCartEmpty} className='btn bg-blue-600 hover:bg-blue-500 text-white btn-block mt-8'>
              Order Now
            </button>
            
          ) : (
            <Link to='/login' className='btn bg-blue-600 hover:bg-blue-500 btn-block text-white mt-8'>
              Please Login
            </Link>
          )}
           <div className=" grid grid-cols-1 max-lg:grid-cols-1 mt-10 m-auto w-[100%] max-sm:w-[95%] gap-3">

<AddressSave addressType="address1" />
<AddressSave addressType="address2" />
</div>
        </div>
      </div>
    </>
  );
};

export default Cart;
