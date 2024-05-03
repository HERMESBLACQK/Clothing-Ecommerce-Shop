import axios from "axios";
import React, { useState, useEffect } from "react";
import { SectionTitle, SelectSize, SingleProductRating, SingleProductReviews } from "../components";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import parse from "html-react-parser";

const ProductDetails = ({ productId }) => {
  const [productData, setProductData] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(0);
  const [rating, setRating] = useState([
    "empty star",
    "empty star",
    "empty star",
    "empty star",
    "empty star",
  ]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${productId}`);
        setProductData(response.data);
        if (response.data) {
          const updatedRating = Array(response.data.rating).fill("full star");
          setRating(updatedRating);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        toast.error("Error fetching product data");
      }
    };

    fetchProductData();
  }, [productId]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SectionTitle title="Product page" path="Home | Shop | Product page" />
      <div className="grid grid-cols-2 max-w-7xl mx-auto mt-5 max-lg:grid-cols-1 max-lg:mx-5">
        {/* Product images */}
        <div className="product-images flex flex-col justify-center max-lg:justify-start">
          <img
            src={`https://${productData?.additionalImageUrls[currentImage]}`}
            className="w-96 text-center border border-gray-600 cursor-pointer"
            alt={productData?.name}
          />
          <div className="other-product-images mt-1 grid grid-cols-3 w-96 gap-y-1 gap-x-2 max-sm:grid-cols-2 max-sm:w-64">
            {productData?.additionalImageUrls.map((imageObj, index) => (
              <img
                src={`https://${imageObj}`}
                key={nanoid()}
                onClick={() => setCurrentImage(index)}
                alt={productData?.name}
                className="w-32 border border-gray-600 cursor-pointer"
              />
            ))}
          </div>
        </div>
        {/* Product details */}
        <div className="single-product-content flex flex-col gap-y-5 max-lg:mt-2">
          <h2 className="text-5xl max-sm:text-3xl text-accent-content">{productData?.name}</h2>
          <SingleProductRating rating={rating} productData={productData} />
          <p className="text-3xl text-error">${productData?.price?.current?.value}</p>
          <div className="text-xl max-sm:text-lg text-accent-content">{parse(productData?.description)}</div>
          <div className="text-2xl">
            <SelectSize sizeList={productData?.availableSizes} size={size} setSize={setSize} />
          </div>
          <div>
            <label htmlFor="Quantity" className="sr-only">Quantity</label>
            <div className="flex items-center gap-1">
              <QuantityInput quantity={quantity} setQuantity={setQuantity} />
            </div>
          </div>
          {/* Other product info */}
          <div className="other-product-info flex flex-col gap-x-2">
            {/* Render other product details */}
          </div>
        </div>
      </div>
      {/* Single product reviews */}
      <SingleProductReviews rating={rating} productData={productData} />
    </>
  );
};

export default ProductDetails;
