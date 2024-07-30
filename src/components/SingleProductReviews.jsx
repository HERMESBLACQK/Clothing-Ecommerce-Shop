import React from "react";
import SingleReview from "./SingleReview";
import RatingPercentage from "./RatingPercentage";
import CreateReview from "./CreateReview";
import { nanoid } from "nanoid";

const SingleProductReviews = ({ rating, productData }) => {
  // Function to add a new review to the list
  const addReview = (newReview) => {
    // Generate a unique ID for the new review
    newReview.id = nanoid();
    // Automatically set the date when the review is submitted
    newReview.date = new Date().toLocaleDateString();

    // Update the productData.reviews array with the new review
    productData.reviews.push(newReview);
    // You might need to update the totalReviewCount as well, depending on how it's managed in your app

    // Perform any additional actions after adding the review
    console.log("New review added:", newReview);
  };

  return (
    <div className="product-reviews max-w-7xl mt-10 mx-auto ">
      <div className=" p-2 grid gap-2 grid-cols-2 max-md:grid-cols-1">
        <RatingPercentage rating={rating} productData={productData} />

        <CreateReview
          addReview={addReview} // Pass down the addReview function
          userAddress={productData?.userAddress} // Pass down user's address
          userFirstname={productData?.userFirstname} // Pass down user's first name
        />
      </div>

      <div className="product-reviews-comments mt-20 px-10">
        <h2 className="text-4xl text-accent-content text-center mb-5 max-sm:text-2xl">
          Reviews
        </h2>
        {productData.reviews.map((item) => (
          <SingleReview key={item.id} reviewObj={item} />
        ))}
        {productData?.totalReviewCount > 3 && (
          <button className="btn bg-[#dc0000] hover:text-black border-none w-full text-white mb-2">
            Load more reviews
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleProductReviews;
