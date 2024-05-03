import React, { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { nanoid } from "nanoid";
import OrderTracking from "../components/OrderTracking";

const OrderHistory = () => {
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrderTracking, setShowOrderTracking] = useState(false); // State to manage the visibility of the order tracking popup
  const [selectedOrder, setSelectedOrder] = useState(null); // State to store the selected order for tracking
  const [currentStatus, setCurrentStatus] = useState();

  const getOrderHistory = async () => {
    try {
      // const response = await axios.get("http://localhost:8080/orders");
      const response = await axios.get("https://json-server-main-yeqa.onrender.com/orders");
      const data = response.data;
      setOrders(
        data.filter((order) => order.userId === localStorage.getItem("id"))
      );
    } catch (error) {
      toast.error(error.response);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      // await axios.put(`http://localhost:8080/orders/${orderId}`, {
      await axios.put(`https://json-server-main-yeqa.onrender.com/${orderId}`, {
        orderStatus: "cancelled",
      });
      toast.success("Order cancelled successfully!");
      getOrderHistory(); // Refresh order history after cancellation
    } catch (error) {
      toast.error("Error cancelling order");
    }
  };

  useEffect(() => {
    if (!loginState) {
      toast.error("You must be logged in to access this page");
      navigate("/");
    } else {
      getOrderHistory();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleTrackOrder = (order) => {
    setShowOrderTracking(true);
    setCurrentStatus(order.orderStatus); 
  };

  return (
    <>
      <SectionTitle title="Order History" path="Home | Order History" />
      <div className="order-history-main max-w-7xl mx-auto mt-10 px-20 max-md:px-4 ">
        {orders?.length === 0 ? (
          <div className="text-center">
            <h1 className="text-4xl text-accent-content">
              There are no orders in the order history
            </h1>
            <Link
              to="/shop"
              className="btn bg-blue-600 hover:bg-blue-500 text-white mt-10"
            >
              Make your first order
            </Link>
          </div>
        ) : (
          orders.map((order) => {
            return (
              <div key={nanoid()} className="collapse collapse-plus bg-base-200 mb-2">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium text-accent-content">
                  Order {order.id} - {order.orderStatus}
                </div>
                <div className="collapse-content">
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
                            <th><img src={`https://${product.image}`} alt="" className="w-10" /></th>
                            <td>{product.title}</td>
                            <td>{product.selectedSize}</td>
                            <td>{product.amount}</td>
                            <td>${(product.price * product.amount).toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan="5" className="text-center">
                            <h4 className="text-md text-accent-content">
                              Subtotal: ${ Math.round(order?.subtotal) }
                            </h4>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="5" className="text-center">
                            <h3 className="text-md text-accent-content">
                              Shipping: $50
                            </h3>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="5" className="text-center">
                            <h3 className="text-md text-accent-content">
                              Tax: 20%: ${ Math.round(order?.subtotal / 5) }
                            </h3>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="5" className="text-center">
                            <h3 className="text-lg text-accent-content">
                              - Order Total: ${ Math.round(order?.subtotal + 50 + (order?.subtotal / 5)) } -
                            </h3>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button
  className={`btn bg-red-600 text-white max-sm:btn-sm max-sm:text-sm ${
    currentStatus === "Ordered" ? "" : "hidden" // Hide button if order status is not "Ordered"
  }`}
  onClick={() => cancelOrder(order.id)}
>
  Cancel Order
</button>

                    <button className="border float-right bg-green-700 text-white btn max-sm:btn-sm max-sm:text-sm" onClick={() => handleTrackOrder(order)}>Track Order</button>
                  </div>
                </div>
              </div>
            );
          })
        )} 
      </div>
      {/* Order tracking popup */}
      {showOrderTracking && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md w-7/12 max-md:w-11/12 max-lg:w-10/12 max-sm:w-11/12 max-sm:p-2">
            {/* Render OrderTracking component with selectedOrder data */}
            <OrderTracking currentStatus={currentStatus} />


            <button
              onClick={() => setShowOrderTracking(false)}
              className="btn bg-red-500 hover:bg-gray-500 text-white mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderHistory;
