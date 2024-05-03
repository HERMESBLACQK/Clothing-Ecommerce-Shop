import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userId: localStorage.getItem('id') || false,
  isLoggedIn: localStorage.getItem('id') ? true : false,
  darkMode: true,
  avatarUrl: null, // Add avatarUrl to the initial state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isLoggedIn = true;
      state.userId = localStorage.getItem('id');
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userId = false;
      toast.success("You have successfuly logout");
    },
    changeMode: (state) => {
      state.darkMode = !state.darkMode;
      if (state.darkMode) {
        document.querySelector('html').setAttribute('data-theme', "dark");
      } else {
        document.querySelector('html').setAttribute('data-theme', "winter");
      }
    },
    updateAvatar: (state, action) => { // Define the updateAvatar action
      state.avatarUrl = action.payload; // Set the avatarUrl from the payload
    },
  },
});

export const { loginUser, logoutUser, changeMode, updateAvatar } = authSlice.actions;

export default authSlice.reducer;
