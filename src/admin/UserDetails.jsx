import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetails = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [wishlistTotal, setWishlistTotal] = useState(0);
  const [ordersTotal, setOrdersTotal] = useState(0);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`); // Corrected endpoint URL
        setUser(response.data);
        calculateTotals(response.data.userWishlist);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const calculateTotals = (wishlist) => {
    let totalItems = 0;
    if (wishlist) {
      wishlist.forEach(item => {
        totalItems += item.amount;
      });
    }
    setWishlistTotal(totalItems);
  };

  

  if (!user) return <div>Loading...</div>;

  return (
    <div className='border p-4'>
      <h2>User Details</h2>
      <p><strong>User ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name} {user.lastname}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Address:</strong> {user.address1?.street}, {user.address1?.state}, {user.address1?.region}</p>
      <p><strong>Total Items in Wishlist:</strong> {wishlistTotal}</p>
      <p><strong>Total Orders:</strong> {ordersTotal}</p>
    </div>
  );
};

export default UserDetails;
