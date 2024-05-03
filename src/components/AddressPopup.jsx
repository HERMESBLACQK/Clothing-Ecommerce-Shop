import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from '../components'; // Assuming you have a Modal component

const AddressPopup = ({ onSelectAddress }) => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        // const response = await axios.get('http://localhost:8080/addresses'); // Assuming this endpoint fetches addresses from db.json
        const response = await axios.get('https://json-server-main-yeqa.onrender.com/addresses'); // Assuming this endpoint fetches addresses from db.json
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, []);

  return (
    <Modal>
      <h2 className="text-lg font-semibold mb-4">Select Delivery Address</h2>
      <ul>
        {addresses.map((address) => (
          <li key={address.id}>
            <button onClick={() => onSelectAddress(address)} className="btn btn-sm bg-blue-600 text-white">
              {address.address1.street}, {address.address1.region}, {address.address1.state}
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default AddressPopup;
