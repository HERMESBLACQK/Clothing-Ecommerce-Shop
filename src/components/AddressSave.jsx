import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddressSave = ({ addressType }) => {
  const [id, setId] = useState(localStorage.getItem("id"));
  const [userData, setUserData] = useState({});
  const loginState = useSelector((state) => state.auth.isLoggedIn);

  const [editedAddress, setEditedAddress] = useState({
    street: "",
    region: "",
    state: "",
  }); // State to hold the edited address
  const [selectedAddress, setSelectedAddress] = useState(""); // State to manage the selected address
  const [editPopupOpen, setEditPopupOpen] = useState(false); // State to manage the edit popup

  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const response = await axios(`https://json-server-main-yeqa.onrender.com/user/${id}`);
      const data = response.data;
      setUserData(data);
    } catch (error) {
      toast.error("Error fetching user data");
    }
  };

  useEffect(() => {
    if (loginState) {
      getUserData();
    } else {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, []);

  const handleAddressEdit = async () => {
    try {
      let updatedAddress = {}; // Initialize an empty object to store the updated address
  
      if (addressType === "address1") {
        // If editing address1
        updatedAddress = { ...userData.address1, ...editedAddress };
      } else if (addressType === "address2") {
        // If editing address2
        updatedAddress = { ...userData.address2, ...editedAddress };
      } else {
        // Handle invalid selection or default to address1
        updatedAddress = { ...userData.address1, ...editedAddress };
      }
  
      // Send PATCH request to update the selected address
      const response = await axios.patch(
        `https://json-server-main-yeqa.onrender.com/user/${id}`, // Include id in the URL
        {
          [addressType]: updatedAddress, // Dynamically set the address field to update based on addressType
        }
      );
  
      console.log("Updated Address Details:", response.data); // Log the updated address details
  
      // Update local user data after successful update
      const updatedUserData = {
        ...userData,
        [addressType]: { ...userData[addressType], ...editedAddress },
      };
      setUserData(updatedUserData);
  
      toast.success("Address updated successfully");
      setEditPopupOpen(false); // Close the edit popup
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Error updating address");
    }
  };
  

  return (
    <>
    <div className="mb-4">

  
    <div className="form-control w-full lg:max-w-xs border p-2 rounded-md bg-base-200 ">
      <h2 className="text-center font-semibold">{addressType === "address1" ? "Address 1" : "Address 2"}</h2>
      {userData[addressType]?.street ? (
        <>
          <p className="italic font-semibold">Street: {userData[addressType].street}</p>
          <p className="text-lg italic font-semibold">Region: {userData[addressType].region}</p>
          <p className="text-lg italic font-semibold">State: {userData[addressType].state}</p>
          <button
            className="border btn-sm w-3/12 max-sm:w-5/12 bg-[#dc0000] hover:bg-[#ffcc00] border-none text-white font-semibold rounded-md"
            onClick={() => {
              setEditedAddress({ ...userData[addressType] }); // Set the edited address
              setSelectedAddress(addressType); // Set the selected address
              setEditPopupOpen(true); // Open the edit popup
            }}
          >
            Edit
          </button>
        </>
      ) : (
        <button
          className="border btn-sm w-3/12 max-sm:w-5/12 bg-[#dc0000] hover:bg-[#ffcc00] border-none text-white font-semibold rounded-md"
          onClick={() => {
            setSelectedAddress(addressType); // Set the selected address
            setEditPopupOpen(true); // Open the edit popup
          }}
        >
          Create
        </button>
      )}

      {/* Edit Address Popup */}
      {editPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Edit Address</h2>
            <label className="block mb-2">
              Street:
              <input
                type="text"
                placeholder="Street"
                className="input input-bordered mb-4"
                value={editedAddress.street}
                onChange={(e) =>
                  setEditedAddress({ ...editedAddress, street: e.target.value })
                }
              />
            </label>
            <label className="block mb-2">
              Region:
              <input
                type="text"
                placeholder="Region"
                className="input input-bordered mb-4"
                value={editedAddress.region}
                onChange={(e) =>
                  setEditedAddress({ ...editedAddress, region: e.target.value })
                }
              />
            </label>
            <label className="block mb-2">
              State:
              <input
                type="text"
                placeholder="State"
                className="input input-bordered mb-4"
                value={editedAddress.state}
                onChange={(e) =>
                  setEditedAddress({ ...editedAddress, state: e.target.value })
                }
              />
            </label>
            <button
              className="btn bg-[#dc0000] hover:bg-[#ffcc00] text-white font-semibold"
              onClick={handleAddressEdit}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
    </>
  );
};

export default AddressSave;
