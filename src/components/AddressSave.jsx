import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios for API requests

const AddressSave = ({ isOpen, onClose, onSelectAddress, onSaveAddress }) => {
  const userData = useSelector((state) => state.userData); // Assuming you have userData in your Redux store

  const handleSelectAddress = (address) => {
    onSelectAddress(address);
    onSaveAddress();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white p-8 rounded-md max-w-md">
        <h2 className="text-lg font-semibold mb-4">Select Address</h2>
        {/* Render your address selection options here */}
        <div className="form-control w-full lg:max-w-xs border p-2 rounded-md bg-base-200">
          <h2 className="text-center font-semibold">Address 1</h2>
          <p className="italic font-semibold">Street: {userData.address1?.street}</p>
          <p className="text-lg italic font-semibold">Region: {userData.address1?.region}</p>
          <p className="text-lg italic font-semibold">State: {userData.address1?.state}</p>
          <button
            onClick={() => handleSelectAddress('Address 1')}
            className="btn bg-blue-500 text-white mr-2"
          >
            Select
          </button>
        </div>
        <div className="form-control w-full lg:max-w-xs border p-2 rounded-md bg-base-200 mt-4">
          <h2 className="text-center font-semibold">Address 2</h2>
          <p className="italic font-semibold">Street: {userData.address2?.street}</p>
          <p className="text-lg italic font-semibold">Region: {userData.address2?.region}</p>
          <p className="text-lg italic font-semibold">State: {userData.address2?.state}</p>
          <button
            onClick={() => handleSelectAddress('Address 2')}
            className="btn bg-blue-500 text-white mr-2"
          >
            Select
          </button>
        </div>
        <button onClick={onClose} className="btn bg-gray-500 text-white mt-4">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddressSave;
