import React from "react";
import { useDispatch } from "react-redux";
import { removeItem, updateCartAmount } from "../features/cart/cartSlice";
import SelectSize from "./SelectSize"; // Import the SelectSize component

const CartItem = ({ cartItem }) => {
  const { id, title, price, image, amount, brandName, selectedSize } = cartItem;
  const dispatch = useDispatch();

  return (
    <article
      key={id}
      className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
    >
      {/* IMAGE */}
      <img
        src={`https://${image}`}
        alt={title}
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      />
      {/* INFO */}
      <div className="sm:ml-16 sm:w-48">
        {/* TITLE */}
        <h3 className="capitalize font-medium text-accent-content">{title}</h3>
        {/* COMPANY */}
        <h4 className="mt-2 capitalize text-sm text-accent-content">
          Brand: {brandName}
        </h4>
        {/* PASS SelectSize COMPONENT */}
        <SelectSize
          sizeList={["S", "M", "L", "XL"]} // Example size list, replace with your actual data
          size={selectedSize} // Pass selectedSize as the size prop
          setSize={(newSize) => {
            // Implement logic to update selected size in db.json or your data store
            console.log("Selected size:", newSize);
          }}
        />
      </div>
      <div className="sm:ml-12">
        {/* AMOUNT */}
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text text-accent-content">Amount</span>
          </label>
          <input
            name="number"
            id="amount"
            className="mt-2 input input-bordered input-sm w-full max-w-xs text-accent-content"
            value={amount}
            onChange={(event) =>
              dispatch(updateCartAmount({ id: id, amount: event.target.value }))
            }
          />
        </div>
      </div>
      <div className=" w-2/12 text-right">
        {/* PRICE */}
        <p className="font-medium sm:ml-auto text-accent-content ">
          ${ (price * amount).toFixed(2) }
        </p>
        {/* REMOVE */}
        <button
          className="mt-2 link link-warning link-hover text-sm p-1  rounded-md bg-red-100 text-red-700 px-4"
          onClick={() => dispatch(removeItem(id))}
        >
          remove
        </button>
      </div>
    </article>
  );
};

export default CartItem;
