
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [totalDelivered, settotalDelivered] = useState();
  const [totalCancelled, settotalCancelled] = useState();


    const fetchData = async () => {
      try {
        const ordersPromise = axios.get('http://localhost:8080/orders');
        const productsPromise = axios.get('http://localhost:8080/products');
        const usersPromise = axios.get('http://localhost:8080/user');

        const [ordersResponse, productsResponse, usersResponse] = await Promise.all([
          ordersPromise,
          productsPromise,
          usersPromise,
        ]);
      ordersPromise.then(orders =>{ const {data}=orders
     settotalDelivered(data.filter(order => order.orderStatus === 'Delivered').length)
     settotalCancelled(data.filter(order => order.orderStatus === 'Cancelled').length)
    });
 
    

        const totalOrders = ordersResponse.data.length; // Assuming orders are returned as an array
     
        const totalUsers = usersResponse.data.length; // Assuming users are returned as an array

        const totalProducts = productsResponse.data.length; // Assuming products are returned as an array

        setDashboardData({
          totalOrders,
          totalDelivered,
          totalCancelled,
          totalUsers,
          totalProducts,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  

  return (
    <div className='bgc'>
      <h1>Welcome to Admin Dashboard</h1>
      <div className="grid">
        <div className="border p-2 grid grid-cols-5 gap-4">
          <div className="border p-2 bg-white rounded-lg">
            <h2>Total Products</h2>
            <p>{dashboardData?.totalProducts}</p>
          </div>
          <div className="border p-2 bg-white rounded-lg">
            <h2>Total Orders</h2>
            <p>{dashboardData?.totalOrders}</p>
          </div>
          <div className="border p-2 bg-white rounded-lg">
            <h2>Total Delivered</h2>
            <p>{dashboardData?.totalDelivered}</p>
          </div>
          <div className="border p-2 bg-white rounded-lg">
            <h2>Total Cancelled</h2>
            <p>{dashboardData?.totalCancelled}</p>
          </div>

      <div className="border p-2 bg-white rounded-lg">
        <h2>Total Users</h2>
        <p>{dashboardData?.totalUsers}</p>
      </div>
        </div>
   
      </div>
<div className="border p-2"></div>


    </div>
  );
};

export default AdminDashboard;