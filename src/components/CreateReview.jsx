import React, { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { FaStar } from 'react-icons/fa';

const CreateReview = ({ addReview }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    reviewTitle: "",
    reviewText: "",
  });
  const [productId, setProductId] = useState();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Fetch product data from db.json or your backend API
        const response = await axios.get("http://localhost:8080/products"); // Adjust URL based on your API endpoint
        const products = response.data?.products || [];

        // Check if products array is not empty and set the product ID
        if (products.length > 0) {
          const firstProduct = products[0];
          setProductId(firstProduct.id);
        } else {
          console.error("No products found.");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData(); // Call the fetchProductData function
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if productId is not null before adding the review
      if (productId !== null) {
        // Get the user ID from localStorage or wherever it's stored in your app
        const userId = localStorage.getItem("id");

        // Fetch logged-in user details from db.json or your backend API
        const userResponse = await axios.get(`http://localhost:8080/user/${userId}`); // Adjust URL based on your API endpoint
        const user = userResponse.data;

        // Create the new review object
        const newReview = {
          id: nanoid(),
          username: `${user.name} ${user.lastname}`,
          userImage: user.profilePicture || "/src/assets/default-profile.jpg", // Assuming profile picture is available in user data
          location: user.address1?.state || "Unknown",
          rating: formData.rating,
          date: new Date().toLocaleDateString(),
          reviewTitle: formData.reviewTitle,
          reviewText: formData.reviewText,
        };

        // Call the addReview function to add the new review
        addReview(productId, newReview);

        // Reset the form data after adding the review
        setFormData({
          rating: 0,
          reviewTitle: "",
          reviewText: "",
        });
      } else {
        console.error("Product ID is null.");
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  // Function to handle star rating change
  const handleStarClick = (rating) => {
          setFormData({ ...formData, rating });
        };
      
        // JSX for rendering star icons based on rating
        const renderStars = () => {
          const stars = [];
          for (let i = 1; i <= 5; i++) {
            stars.push(
              <FaStar
                key={i}
                className={`cursor-pointer text-2xl ${i <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                onClick={() => handleStarClick(i)}
              />
            );
          }
          return stars;
        };

  return (
    <form onSubmit={handleSubmit} className=" p-4 border-4 shadow-xl rounded-xl">
          <div className="m-auto ">
          <div className="mb-4 m-auto  px-2 flex">
          <label htmlFor="rating" className="font-bold mr-1">Rating:</label>
          <div className="flex items-center text-2xl">
            {renderStars()}
          </div>
        </div>
      <div className="mb-4  px-2">
        <label htmlFor="reviewTitle" className="font-bold mr-1"> Title:</label>
        <input
          type="text"
          id="reviewTitle"
          name="reviewTitle"
          
          className="rounded-lg p-1 text-lg outline-none w-8/12"
          value={formData.reviewTitle}
          onChange={(e) =>
            setFormData({ ...formData, reviewTitle: e.target.value })
          }
        />
      </div>
      <div className="mb-4  px-2 flex align-top">
        <label htmlFor="reviewText" className="font-bold mr-1"> Text:</label>
        <textarea
          id="reviewText"
          name="reviewText"
          rows={4}
          cols={60}
          className="rounded-lg p-1 text-lg outline-none"
          value={formData.reviewText}
          onChange={(e) =>
            setFormData({ ...formData, reviewText: e.target.value })
          }
        ></textarea>
      </div>
      <button type="submit" className="btn bg-[#4a6104] text-white hover:text-black border-none">Submit Review</button>
      </div>
    </form>
  );
};

export default CreateReview;
