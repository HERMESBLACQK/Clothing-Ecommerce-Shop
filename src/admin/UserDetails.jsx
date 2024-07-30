import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SectionTitle from '../components/SectionTitle';

const UserDetails = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://json-server-main-yeqa.onrender.com/user/${userId}`);
        setUser(response.data);
        
      } catch (error) {
        toast.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <>
      <SectionTitle title="User Details" path="Home | User Details" />
      <div>
        <h2>User Details</h2>
        <p>User ID: {user.id}</p>
        <p>Name: {user.name}</p>
        <p>Last Name: {user.lastname}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Address: {user.address1?.street}</p>
        {/* Add more user details as needed */}
      </div>
    </>
  );
};

export default UserDetails;
