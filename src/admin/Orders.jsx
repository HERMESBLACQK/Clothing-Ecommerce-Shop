import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { nanoid } from "nanoid";
import OrderTracking from "../components/OrderTracking";
import OrderStatusModal from "../components/OrderStatusModal";

const OrdersList = () => {
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrderTracking, setShowOrderTracking] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [showStatusModal, setShowStatusModal] = useState(false);

  const getOrderHistory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/orders");
      const data = response.data;
      if (statusFilter === "all") {
        setOrders(data);
      } else {
        setOrders(data.filter((order) => order.orderStatus === statusFilter));
      }
    } catch (error) {
      toast.error(error.response);
    }
  };

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderTracking(true);
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleUpdateOrder = (orderId) => {
    setSelectedOrder(orderId);
    setShowStatusModal(true);
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      const updatedOrder = { ...selectedOrder, orderStatus: newStatus };
      const currentDate = new Date().toISOString(); // Get the current date and time
      updatedOrder.statusChangeDate = currentDate; // Add statusChangeDate to updatedOrder

      await axios.put(`http://localhost:8080/orders/${selectedOrder.id}`, updatedOrder);
      toast.success("Order status updated successfully!");
      getOrderHistory();
      setShowStatusModal(false);
    } catch (error) {
      console.error(error); // Log the error to inspect it in the console
      toast.error("Error updating order status");
    }
  };

  useEffect(() => {
    if (!loginState) {
      toast.error("You must be logged in to access this page");
      navigate("/");
    } else {
      getOrderHistory();
    }
  }, [statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      <div className="w-10/12 m-auto gap-4 grid grid-cols-3 mt-6">
        <div className="border p-2 rounded-xl bg-white ">
          <h3 className="text-xl font-semibold">Total Orders</h3>
          <p>{orders.length}</p>
        </div>
        <div className="border p-2 rounded-xl bg-white ">
          <h3 className="text-xl font-semibold">Delivered Orders</h3>
          <p>{orders.filter(order => order.orderStatus === 'Delivered').length}</p>
        </div>
        <div className="border p-2 rounded-xl bg-white ">
          <h3 className="text-xl font-semibold">Cancelled Orders</h3>
          <p>{orders.filter(order => order.orderStatus === 'Cancelled').length}</p>
        </div>
        <div className="border p-2 rounded-xl bg-white ">
          <h3 className="text-xl font-semibold">Ordered  </h3>
          <p>{orders.filter(order => order.orderStatus === 'ordered').length}</p>
        </div>
        <div className="border p-2 rounded-xl bg-white ">
          <h3 className="text-xl font-semibold">Processing Orders</h3>
          <p>{orders.filter(order => order.orderStatus === 'Processing').length}</p>
        </div>
        <div className="border p-2 rounded-xl bg-white ">
          <h3 className="text-xl font-semibold">Shipped Orders</h3>
          <p>{orders.filter(order => order.orderStatus === 'Shipping').length}</p>
        </div>
      </div>
<div className=" max-w-7xl">
      <label className="float-right flex mr-10 my-4">
       <p className="text-white text-lg"> Filter by Status: </p>
        <select value={statusFilter} onChange={handleFilterChange} className="rounded ml-2">
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </label>
      </div>
      <div className="order-history-main max-w-7xl mx-auto mt-10 px-20 max-md:px-4 ">
        {orders?.length === 0 ? (
          <div className="text-center">
            <h1 className="text-4xl text-accent-content">
              There are no orders in the order history
            </h1>
           
          </div>
        ) : (
          orders.map((order) => (
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
                      {order.cartItems?.map((product, counter) => (
                        <tr className="text-accent-content" key={nanoid()}>
                          <td>{counter + 1}</td>
                          <td>
                            <img
                              src={`https://${product?.image}`} 
                              alt=""
                              className="w-10"
                            />
                          </td>
                          <td>{product?.title}</td> 
                          <td>{product?.selectedSize}</td> 
                          <td>{product?.amount}</td> 
                          <td>${(product?.price * product?.amount)?.toFixed(2)}</td> 
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
                      {/* Additional rows for subtotal, shipping, tax, and total */}
                    </tbody>
                  </table>
                  {order.orderStatus !== "Cancelled" && ( 
                    <button
                      className="border float-right bg-blue-500 text-white btn max-sm:btn-sm max-sm:text-sm"
                      onClick={() => handleUpdateOrder(order.id)}
                    >
                      Update Order
                    </button>
                  )}
                  <button className="border float-right bg-green-700 text-white btn max-sm:btn-sm max-sm:text-sm" onClick={() => handleTrackOrder(order)}>Track Order</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Order tracking popup */}
      {showOrderTracking && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md w-7/12 max-md:w-11/12 max-lg:w-10/12 max-sm:w-11/12 max-sm:p-2">
            <OrderTracking orderId={selectedOrder?.id} orderStatus={selectedOrder?.orderStatus} />
            <button
              onClick={() => setShowOrderTracking(false)}
              className="btn bg-red-500 hover:bg-gray-500 text-white mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Render the status update modal */}
      {showStatusModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md w-4/12 max-md:w-11/12 max-lg:w-10/12 max-sm:w-11/12 max-sm:p-2">
            <OrderStatusModal
              orderId={selectedOrder?.id}
              orderStatus={selectedOrder?.orderStatus}
              onClose={() => setShowStatusModal(false)} 
              onUpdateStatus={handleStatusUpdate} 
            />
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersList;
