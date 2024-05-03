import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { IoMdHeartDislike } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { updateWishlist, removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { toast } from "react-toastify";
import axios from "axios"; // Import axios
import { store } from "../store";

const ProductElement = ({ id, title, image, rating, price, brandName }) => {
  const dispatch = useDispatch(); // Add dispatch hook
  const { wishItems } = useSelector((state) => state.wishlist);
  const loginState = useSelector((state) => state.auth.isLoggedIn);

  // Construct product object
  const product = {
    id,
    title,
    image,
    rating,
    price,
    brandName,
    amount: 1,
    isInWishList: wishItems.some((item) => item.id === id), // Simplify the logic
  };

  const addToWishlistHandler = async (product) => {
    try {
      // const response = await axios.get(`http://localhost:8080/user/${localStorage.getItem("id")}`);
      const response = await axios.get(`https://json-server-main-yeqa.onrender.com/user/${localStorage.getItem("id")}`);
      const userObj = response.data;
      
      userObj.userWishlist = userObj.userWishlist || [];
      userObj.userWishlist.push(product);

      // await axios.put(`http://localhost:8080/user/${localStorage.getItem("id")}`, userObj);
      await axios.put(`https://json-server-main-yeqa.onrender.com/user/${localStorage.getItem("id")}`, userObj);
      
      store.dispatch(updateWishlist({ userObj }));
      toast.success("Product added to the wishlist!");
    }
     catch (error) {
      console.error(error);
    }
  };

  const removeFromWishlistHandler = async (product) => {
    try {
      // const response = await axios.get(`http://localhost:8080/user/${localStorage.getItem("id")}`);
      const response = await axios.get(`https://json-server-main-yeqa.onrender.com/user/${localStorage.getItem("id")}`);
      const userObj = response.data;

      userObj.userWishlist = userObj.userWishlist || [];
      const newWishlist = userObj.userWishlist.filter((item) => item.id !== product.id);
      userObj.userWishlist = newWishlist;

      // await axios.put(`http://localhost:8080/user/${localStorage.getItem("id")}`, userObj);
      await axios.put(`https://json-server-main-yeqa.onrender.com/user/${localStorage.getItem("id")}`, userObj);
      
      store.dispatch(removeFromWishlist({ userObj }));
      // toast.success("Product removed from the wishlist!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl ">
      <div className="shadow-md rounded-lg max-w-sm bg-base-100 w-11/12 ">
        <Link to={`/shop/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
          <img
            className="rounded-t-lg p-4"
            src={`https://${image}`}
            alt="product image"
          />
        </Link>
        <div className="px-4 pb-2">
          <div className=" flex p-0">

          <Link to={`/shop/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
            <h3 className="font-semibold w-[97%] text-lg leading-6 tracking-tight mb-5 text-accent-content">
              {title}
            </h3>
          </Link>
          {product.isInWishList ? (
              <button
                className="btn-sm rounded-[50%] bg-[#4a6104] bg-opacity-70 hover:text-red-400 text-red-400 text-lg p-2"
                onClick={() => {
                  if (loginState) {
                    removeFromWishlistHandler(product);
                  } else {
                    toast.error("You must be logged in to remove products from the wishlist");
                  }
                }}
              >
                <IoMdHeartDislike className="" />
                
              </button>
            ) : (
              <button
                className="btn-sm rounded-[50%] bg-[#4a6104] bg-opacity-70 hover:text-red-400 text-lg text-white p-2"
                onClick={() => {
                  if (loginState) {
                    addToWishlistHandler(product);
                  } else {
                    toast.error("You must be logged in to add products to the wishlist");
                  }
                }}
              >
                <FaHeart className="" />
              
              </button>
            )}
          </div>
      
          <div className="text-left flex items-start justify-between">
            <span className="text-2xl font-bold tracking-tight text-[#4a6104]">${price}</span>
         
            <button
              className="btn rounded-xl btnbg hover:bg-[#b6dd40] text-white"
              onClick={() => {
                if (loginState) {
                  dispatch(addToCart(product));
                  // toast.success("Product added to the cart!");
                } else {
                  toast.error("You must be logged in to add products to the cart");
                }
              }}
            >
              <FaCartShopping className="" />  Add to cart
              
            </button>
      
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductElement;
