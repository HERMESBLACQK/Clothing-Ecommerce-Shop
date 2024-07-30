import React from 'react';
import { Link } from 'react-router-dom';
import SingleProductRating from './SingleProductRating';

const RatingPercentage = ({ rating, productData }) => {
  const renderRatingRow = (stars, percentage) => (
    <div className="flex items-center justify-between mt-4">
      <Link
        to="#"
        className="text-lg font-medium text-blue-500 hover:underline"
      >
        {stars} star
      </Link>
      <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded-full relative overflow-hidden">
        <div
          className="h-5 bg-orange-400 rounded-full absolute top-0 left-0"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="text-lg font-medium text-gray-800">{percentage}%</span>
    </div>
  );

  return (
    <div className="border-4 rounded-xl shadow-xl p-6 bg-white">
      <div className="flex items-center mb-4 justify-center">
        <SingleProductRating rating={rating} productData={productData} />
      </div>
      {productData?.rating === 5 ? (
        <>
          {renderRatingRow(5, 90)}
          {renderRatingRow(4, 5)}
          {renderRatingRow(3, 2)}
          {renderRatingRow(2, 1)}
          {renderRatingRow(1, 1)}
        </>
      ) : productData?.rating === 4 ? (
        <>
          {renderRatingRow(5, 60)}
          {renderRatingRow(4, 20)}
          {renderRatingRow(3, 10)}
          {renderRatingRow(2, 5)}
          {renderRatingRow(1, 5)}
        </>
      ) : productData?.rating === 3 ? (
        <>
          {renderRatingRow(5, 20)}
          {renderRatingRow(4, 30)}
          {renderRatingRow(3, 40)}
          {renderRatingRow(2, 5)}
          {renderRatingRow(1, 5)}
        </>
      ) : productData?.rating === 2 ? (
        <>
          {renderRatingRow(5, 5)}
          {renderRatingRow(4, 15)}
          {renderRatingRow(3, 30)}
          {renderRatingRow(2, 40)}
          {renderRatingRow(1, 10)}
        </>
      ) : (
        <>
          {renderRatingRow(5, 5)}
          {renderRatingRow(4, 10)}
          {renderRatingRow(3, 15)}
          {renderRatingRow(2, 10)}
          {renderRatingRow(1, 60)}
        </>
      )}
    </div>
  );
};

export default RatingPercentage;
