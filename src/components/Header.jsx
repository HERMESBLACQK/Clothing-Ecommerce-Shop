import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHeadphones, FaRegEnvelope, FaHeart, FaSun, FaMoon, FaWindowClose, FaEye } from "react-icons/fa";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { AiFillShopping } from "react-icons/ai";

import "../styles/Header.css";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "../features/auth/authSlice";
import { store } from "../store";
import axios from "axios";
import { clearWishlist, updateWishlist } from "../features/wishlist/wishlistSlice";
import { removeItem, updateCartAmount } from "../features/cart/cartSlice";

const Header = () => {
  const { amount } = useSelector((state) => state.cart);
  const { total } = useSelector((state) => state.cart);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState(localStorage.getItem("id"));
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState("https://xsgames.co/randomusers/avatar.php?g=male");

  const fetchWishlist = async () => {
    if (loginState) {
      try {
        const getResponse = await axios.get(
          `https://json-server-main-yeqa.onrender.com/user/${localStorage.getItem("id")}`
        );
        const userObj = getResponse.data;
        store.dispatch(updateWishlist({ userObj }));
      } catch (error) {
        console.error(error);
      }
    } else {
      store.dispatch(clearWishlist());
    }
  };

  useEffect(() => {
    setIsLoggedIn(loginState);
    fetchWishlist();
  }, [loginState]);

  const increaseAmount = (itemId) => {
    dispatch(updateCartAmount({ id: itemId, amount: 1 }));
  };

  const decreaseAmount = (itemId, currentAmount) => {
    if (currentAmount > 1) {
      dispatch(updateCartAmount({ id: itemId, amount: -1 }));
    }
  };

  const removeFromCart = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://127.0.0.1:3000/user/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        // Update the selected image
        setSelectedImage(URL.createObjectURL(file));
        alert('Image uploaded successfully');
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      alert('Image upload failed');
    }
  };

  return (
    <>
    
      <div className="navbar mx-auto bgc ">
        <div className="flex-1">
          <Link to="/" className="btn text-bg-800 btn-ghost normal-case text-2xl  italic font-semibold max-sm:text-lg">
            <AiFillShopping />
            CABS STORE
          </Link>
        </div>
        <div className="flex-none">
          <Link to="/search" className="btn btn-ghost btn-circle text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
          <Link to="/wishlist" className="btn btn-ghost btn-circle text-gray-800">
            <FaHeart className="text-xl" />
          </Link>
          <div className="dropdown dropdown-end cart text-gray-800">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator ">
                <span className="rounded-md p-1 absolute bottom-3 left-2 float-left text-l font-bold"> {amount}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </label>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-96 h-96 max-md:left-[-150px] max-md:w-60 bg-base-100 shadow">
              <div className="card-body">
                <span className="font-bold text-lg text-accent-content">{amount} Items</span>
                <div className="h-52 overflow-y-scroll custom-scrollbar">
                  <div className="mt-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="items-center justify-between mb-2 shadow-lg rounded-md p-1">
                        <div className="flex items-center justify-between mb-2">
                          <img src={`https://${item.image}`} alt={item.title} className="w-10" />
                          <div className="flex-1 ml-3">
                            <h4 className="text-sm font-semibold text-accent-content">{item.title}</h4>
                            <p className="text-xs text-[#dc0000] font-bold">&#x20A6;{item.price.toFixed(2)} x {item.amount}</p>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div>
                            <button className="btn btn-sm btn-outline btn-circle mr-2" onClick={() => increaseAmount(item.id)}>+</button>
                            <button className="btn btn-sm btn-outline btn-circle mr-2" onClick={() => decreaseAmount(item.id, item.amount)}>-</button>
                          </div>
                          <button className="p-1 rounded-md btn-error hover:text-warning" onClick={() => removeFromCart(item.id)}>Cancel</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <span className="text-[#dc0000] font-bold">Subtotal: &#x20A6;{total.toFixed(2)}</span>
                <div className="card-actions">
                  <Link to="/cart" className="btn bg-[#dc0000] btn-block text-white hover:bg-[#ffcc00]">View cart</Link>
                </div>
              </div>
            </div>
          </div>
          {isLoggedIn && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={selectedImage} alt="User Avatar" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-48 items-center text-center">
                <li className="flex justify-between w-full">
                  <div className="flex justify-around">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                        <img src={selectedImage} alt="User Avatar" />
                      </div>
                    </label>
                    <FaEye className="text-xl text-black " onClick={() => setShowPopup(true)} />
                  </div>
                </li>
                <li className="w-full text-center">
                  <Link to="/user-profile" className=" text-accent-content hover:bg-[#ffcc00] text-center w-full">Profile</Link>
                </li>
                <li className="w-full text-center">
                  <Link to="/order-history" className="text-accent-content hover:bg-[#ffcc00]">Order history</Link>
                </li>
                <li className="w-full text-center">
                  <Link to="/login" className="text-accent-content hover:bg-[#ffcc00]">Logout</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="navbar-bottom-menu border-y border-gray-800 bgc">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <ul className="menu text-center grid grid-cols-4">
              <li className="text-lg text-center">
                <NavLink className="text-accent-content text-center " to="/">Home</NavLink>
              </li>
              <li className="text-lg text-center">
                <NavLink className="text-accent-content " to="/shop">Shop</NavLink>
              </li>
              <li className="text-lg text-center">
                <NavLink className="text-accent-content " to="/about-us">About</NavLink>
              </li>
              <li className="text-lg text-center">
                <NavLink className="text-accent-content " to="/contact">Contact</NavLink>
              </li>
              {!isLoggedIn && (
                <>
                  <li className="text-lg text-center">
                    <NavLink className="text-accent-content p-2 " to="/login">Login</NavLink>
                  </li>
                 <li className="text-xl text-center">
                    <NavLink className="text-accent-content p-2" to="/register">Register</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="drawer-side z-10">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content mt-4">
              <label htmlFor="my-drawer" className="btn drawer-button">
                <FaWindowClose className="text-3xl ml-auto" />
              </label>
              <li className="text-xl text-center  p-2 ">
                <NavLink className="text-accent-content   text-center " to="/">Home</NavLink>
              </li>
              <li className="text-xl text-center p-2">
                <NavLink className="text-accent-content" to="/shop ">Shop</NavLink>
              </li>
              <li className="text-xl text-center">
                <NavLink className="text-accent-content " to="/about-us">About us</NavLink>
              </li>
              <li className="text-xl text-center">
                <NavLink className="text-accent-content " to="/contact">Contact</NavLink>
              </li>
              {!isLoggedIn && (
                <>
                  <li className="text-xl text-center">
                    <NavLink className="text-accent-content " to="/login">Login</NavLink>
                  </li>
                  <li className="text-xl text-center">
                    <NavLink className="text-accent-content p-2" to="/register">Register</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="container text-xl text-center navlinks-container">
          <NavLink className="text-accent-content p-2 text-center" to="/">Home</NavLink>
          <NavLink className="text-accent-content p-2 text-center" to="/shop">Shop</NavLink>
          <NavLink className="text-accent-content p-2 text-center" to="/about-us">About us</NavLink>
          <NavLink className="text-accent-content text-center p-2" to="/contact">Contact</NavLink>
          {!isLoggedIn && (
            <>
              <NavLink className="text-accent-content p-2 text-center" to="/login">Login</NavLink>
              <NavLink className="text-accent-content p-2 text-center" to="/register">Register</NavLink>
            </>
          )}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex justify-end">
              <button onClick={() => setShowPopup(false)} className="btn btn-ghost btn-circle">
                <FaWindowClose className="text-2xl" />
              </button>
            </div>
            <div className="flex flex-col items-center">
              <img src={selectedImage} alt="Selected" className="w-64 h-64 mb-4" />
              <input type="file" onChange={handleImageUpload} className="mb-4" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
