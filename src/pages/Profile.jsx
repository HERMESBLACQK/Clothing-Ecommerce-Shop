import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import AddressSave from "../components/AddressSave";

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
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const navigate = useNavigate();
  const [editPopupOpen, setEditPopupOpen] = useState(false); // State to manage the edit popup

  const getUserData = async () => {
    try {
      const response = await axios(`https://json-server-main-yeqa.onrender.com/user/${id}`);
      const data = response.data;
      setUserFormData({
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
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
      const getResponse = await axios(`https://json-server-main-yeqa.onrender.com/user/${id}`);
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
        `https://json-server-main-yeqa.onrender.com/user/${id}`,
        {
          id: id,
          name: userFormData.name,
          lastname: userFormData.lastname,
          email: userFormData.email,
          phone: userFormData.phone,
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
              <span className="label-text">Your Old Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.password}
              onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
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
      <div className="border grid grid-cols-2 max-lg:grid-cols-1 mt-10 m-auto w-[50%] max-sm:w-[75%] gap-3">

      <AddressSave addressType="address1" />
      <AddressSave addressType="address2" />
      </div>
    </>
  );
};

export default Profile;
