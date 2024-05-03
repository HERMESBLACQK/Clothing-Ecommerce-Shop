import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";

const Profile = () => {
  const [id, setId] = useState(localStorage.getItem("id"));
  const [userData, setUserData] = useState({});
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const [userFormData, setUserFormData] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    phone: "",
    address1: {
      street: "",
      region: "",
      state: "",
    },
    address2: {
      street: "",
      region: "",
      state: "",
    },
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const navigate = useNavigate();
  const [editPopupOpen, setEditPopupOpen] = useState(false); // State to manage the edit popup
  const [editedAddress, setEditedAddress] = useState({
    street: "",
    region: "",
    state: "",
  }); // State to hold the edited address
  const [selectedAddress, setSelectedAddress] = useState(""); // State to manage the selected address

  const getUserData = async () => {
    try {
      const response = await axios(`http://localhost:8080/user/${id}`);
      const data = response.data;
      setUserFormData({
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        address1: {
          street: data.address1?.street || "",
          region: data.address1?.region || "",
          state: data.address1?.state || "",
        },
        address2: {
          street: data.address2?.street || "",
          region: data.address2?.region || "",
          state: data.address2?.state || "",
        },
        password: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setUserData(data);
    } catch (error) {
      toast.error("Error: ", error.response);
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
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const getResponse = await axios(`http://localhost:8080/user/${id}`);
      const userObj = getResponse.data;

      if (userFormData.password !== userObj.password) {
        toast.error("Old password is incorrect");
        return;
      }

      if (userFormData.newPassword !== userFormData.confirmNewPassword) {
        toast.error("New password and confirm new password must match");
        return;
      }

      if (userFormData.password === userFormData.newPassword) {
        toast.error("Old password cannot be the same as the new password");
        return;
      }

      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&:])[A-Za-z\d@$!%*#?&:]{8,}$/;
      if (!passwordRegex.test(userFormData.newPassword)) {
        toast.error(
          "New password must be at least 8 characters long and contain at least one letter, one number, and one special character such as (@$!%*#?&:)"
        );
        return;
      }

      const putResponse = await axios.put(
        `http://localhost:8080/user/${id}`,
        {
          id: id,
          name: userFormData.name,
          lastname: userFormData.lastname,
          email: userFormData.email,
          phone: userFormData.phone,
          address1: userFormData.address1,
          address2: userFormData.address2,
          password: userFormData.newPassword,
          userWishlist: await userObj.userWishlist,
        }
      );
      const putData = putResponse.data;
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error.response);
    }
  };


  const handleAddressEdit = async () => {
    try {
      let updatedAddress = {}; // Initialize an empty object to store the updated address
  
      if (selectedAddress === "address1") {
        // If editing address1
        updatedAddress = { ...userData.address1, ...editedAddress };
      } else if (selectedAddress === "address2") {
        // If editing address2
        updatedAddress = { ...userData.address2, ...editedAddress };
      } else {
        // Handle invalid selection or default to address1
        updatedAddress = { ...userData.address1, ...editedAddress };
      }
  
      // Send PATCH request to update the selected address
      const response = await axios.patch(`http://localhost:8080/user/${id}`, {
        [selectedAddress]: updatedAddress, // Dynamically set the address field to update based on selectedAddress
      });
  
      console.log("Updated Address Details:", response.data); // Log the updated address details
  
      // Update local user data after successful update
      const updatedUserData = {
        ...userData,
        [selectedAddress]: { ...userData[selectedAddress], ...editedAddress },
      };
      setUserData(updatedUserData);
  
      const updatedUserFormData = {
        ...userFormData,
        [selectedAddress]: { ...userFormData[selectedAddress], ...editedAddress },
      };
      setUserFormData(updatedUserFormData);
  
      toast.success("Address updated successfully");
      setEditPopupOpen(false); // Close the edit popup
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Error updating address");
    }
  };
  
  
  

  return (
    <>
      <SectionTitle title="User Profile" path="Home | User Profile" />
      <form className="max-w-7xl mx-auto text-center px-10" onSubmit={updateProfile}>
        <div className="grid grid-cols-3 max-lg:grid-cols-1">
          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.name}
              onChange={(e) => {setUserFormData({...userFormData, name: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Lastname</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.lastname}
              onChange={(e) => {setUserFormData({...userFormData, lastname: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.email}
              onChange={(e) => {setUserFormData({...userFormData, email: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Phone</span>
            </label>
            <input
              type="tel"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.phone}
              onChange={(e) => {setUserFormData({...userFormData, phone: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Adress</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.adress}
              onChange={(e) => {setUserFormData({...userFormData, address1: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Old Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value=""
              onChange={(e) =>
               { setUserFormData({ ...userFormData, password: e.target.value })}
              }
            />
          </div>
          {/* New Password */}
          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">New Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.newPassword}
              onChange={(e) =>
                setUserFormData({ ...userFormData, newPassword: e.target.value })
              }
            />
          </div>
          {/* Confirm New Password */}
          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Confirm New Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.confirmNewPassword}
              onChange={(e) =>
                setUserFormData({
                  ...userFormData,
                  confirmNewPassword: e.target.value,
                })
              }
            />
          </div>
     
        </div>
        <button
          className="btn  bg-[#4a6104] hover:bg-[#b6dd40] border-none text-white mt-10"
          type="submit"
        >
          Update Profile
        </button>
      </form>

      <div className="grid grid-cols-2 max-lg:grid-cols-1 mt-10 m-auto w-[50%] gap-3">
        <div className="form-control w-full lg:max-w-xs border p-2 rounded-md bg-base-200">
          <h2 className="text-center font-semibold">Address 1</h2>
          <p className="italic font-semibold">Street: {userData.address1?.street}</p>
          <p className="text-lg italic font-semibold">Region: {userData.address1?.region}</p>
          <p className="text-lg italic font-semibold">State: {userData.address1?.state}</p>
          <button
            className="border btn-sm w-3/12 bg-[#4a6104] hover:bg-[#b6dd40] border-none text-white font-semibold rounded-md "
            onClick={() => {
              setEditedAddress({ ...userData.address1 }); // Set the edited address
              setEditPopupOpen(true); // Open the edit popup
            }}
          >
            Edit
          </button>
        </div>
        <div className="form-control w-full lg:max-w-xs border p-2 rounded-md bg-base-200">
          <h2 className="text-center font-semibold">Address 2</h2>
          <p className="italic font-semibold">Street: {userData.address2?.street}</p>
          <p className="text-lg italic font-semibold">Region: {userData.address2?.region}</p>
          <p className="text-lg italic font-semibold">State: {userData.address2?.state}</p>
          <button
            className="border btn-sm w-3/12 bg-[#4a6104] hover:bg-[#b6dd40] border-none text-white font-semibold rounded-md "
            onClick={() => {
              setEditedAddress({ ...userData.address2 }); // Set the edited address
              setEditPopupOpen(true); // Open the edit popup
            }}
          >
            Edit
          </button>
        </div>
      </div>
  
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
              className="btn bg-[#4a6104] hover:bg-[#b6dd40] text-white font-semibold"
              onClick={handleAddressEdit}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
