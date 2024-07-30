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
  const [editPopupOpen, setEditPopupOpen] = useState(false);

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
      <form className="max-w-4xl mx-auto text-center px-10 py-6 mt-4 bg-white shadow-lg rounded-lg" onSubmit={updateProfile}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={userFormData.name}
              onChange={(e) => setUserFormData({...userFormData, name: e.target.value})}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Your Lastname</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={userFormData.lastname}
              onChange={(e) => setUserFormData({...userFormData, lastname: e.target.value})}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={userFormData.email}
              onChange={(e) => setUserFormData({...userFormData, email: e.target.value})}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Your Phone</span>
            </label>
            <input
              type="tel"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={userFormData.phone}
              onChange={(e) => setUserFormData({...userFormData, phone: e.target.value})}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Your Old Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={userFormData.password}
              onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">New Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={userFormData.newPassword}
              onChange={(e) => setUserFormData({ ...userFormData, newPassword: e.target.value })}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Confirm New Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={userFormData.confirmNewPassword}
              onChange={(e) => setUserFormData({ ...userFormData, confirmNewPassword: e.target.value })}
            />
          </div>
        </div>
        <button
          className="btn bg-[#dc0000] hover:bg-[#ffcc00] border-none text-white mt-6 w-full md:w-auto"
          type="submit"
        >
          Update Profile
        </button>
      </form>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 mb-4 mx-auto w-full lg:w-[50%] max-sm:w-[75%] p-6 bg-white shadow-lg rounded-lg">
        <AddressSave addressType="address1" />
        <AddressSave addressType="address2" />
      </div>
    </>
  );
};

export default Profile;
