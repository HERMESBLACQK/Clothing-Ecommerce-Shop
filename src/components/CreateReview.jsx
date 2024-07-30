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
        const response = await axios.get("https://json-server-main-yeqa.onrender.com/products");
        const products = response.data?.products || [];
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
    fetchProductData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productId !== null) {
        const userId = localStorage.getItem("id");
        const userResponse = await axios.get(`https://json-server-main-yeqa.onrender.com/user/${userId}`);
        const user = userResponse.data;

        const newReview = {
          id: nanoid(),
          username: `${user.name} ${user.lastname}`,
          userImage: user.profilePicture || "/src/assets/default-profile.jpg",
          location: user.address1?.state || "Unknown",
          rating: formData.rating,
          date: new Date().toLocaleDateString(),
          reviewTitle: formData.reviewTitle,
          reviewText: formData.reviewText,
        };

        addReview(productId, newReview);

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

  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`cursor-pointer text-3xl transition-colors duration-200 ${i <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
          onClick={() => handleStarClick(i)}
        />
      );
    }
    return stars;
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border-2 shadow-md rounded-lg bg-white">
      <div className="mb-6">
        <label htmlFor="rating" className="block text-lg font-semibold mb-2">Rating:</label>
        <div className="flex items-center">
          {renderStars()}
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="reviewTitle" className="block text-lg font-semibold mb-2">Title:</label>
        <input
          type="text"
          id="reviewTitle"
          name="reviewTitle"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={formData.reviewTitle}
          onChange={(e) =>
            setFormData({ ...formData, reviewTitle: e.target.value })
          }
        />
      </div>
      <div className="mb-6">
        <label htmlFor="reviewText" className="block text-lg font-semibold mb-2">Comment:</label>
        <textarea
          id="reviewText"
          name="reviewText"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={formData.reviewText}
          onChange={(e) =>
            setFormData({ ...formData, reviewText: e.target.value })
          }
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200"
      >
        Submit Review
      </button>
    </form>
  );
};

export default CreateReview;
