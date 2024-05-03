import React from "react";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";

const SingleOrderDetails = ({ orders, cancelOrder, handleTrackOrder }) => {
  const { id } = useParams(); // Access the order ID from URL params

  // Find the order with the matching ID
  const order = orders.find((order) => order.id === id);

  if (!order) {
    return <div>No order found for ID: {id}</div>;
  }



  return (
    <div className="overflow-x-auto">
      <table className="table max-sm:table-xs table-pin-rows table-pin-cols">
        {/* head */}
        <thead>
          <tr className="text-accent-content">
            <th>Order</th>
            <th>Image</th>
            <th>Name</th>
            <th>Size</th>
            <th>Amount</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {order.cartItems.map((product, counter) => (
            <tr className="text-accent-content" key={nanoid()}>
              <th>{counter + 1}</th>
              <th>
                <img src={`https://${product.image}`} alt="" className="w-10" />
              </th>
              <td>{product.title}</td>
              <td>{product.selectedSize}</td>
              <td>{product.amount}</td>
              <td>${(product.price * product.amount).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="5" className="text-center">
              <h4 className="text-md text-accent-content">
                Subtotal: ${Math.round(order?.subtotal)}
              </h4>
            </td>
          </tr>
          <tr>
            <td colSpan="5" className="text-center">
              <h3 className="text-md text-accent-content">Shipping: $50</h3>
            </td>
          </tr>
          <tr>
            <td colSpan="5" className="text-center">
              <h3 className="text-md text-accent-content">
                Tax: 20%: ${Math.round(order?.subtotal / 5)}
              </h3>
            </td>
          </tr>
          <tr>
            <td colSpan="5" className="text-center">
              <h3 className="text-lg text-accent-content">
                - Order Total: $
                {Math.round(order?.subtotal + 50 + order?.subtotal / 5)} -
              </h3>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        className={`btn bg-red-600 text-white max-sm:btn-sm max-sm:text-sm ${
          order.orderStatus === "pending" ? "" : "pending"
        }`}
        onClick={() => cancelOrder(order.id)}
      >
        Cancel Order
      </button>
      <button
        className="border float-right bg-green-700 text-white btn max-sm:btn-sm max-sm:text-sm"
        onClick={() => handleTrackOrder(order)}
      >
        Track Order
      </button>
    </div>
  );
};

export default SingleOrderDetails;
