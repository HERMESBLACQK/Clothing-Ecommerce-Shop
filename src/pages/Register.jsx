import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionTitle } from "../components";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const navigate = useNavigate();

  const isValidate = () => {
    let isProceed = true;
    let errorMessage = "";

    if (name.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in username field";
    } else if (lastname.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in lastname field";
    } else if (email.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in email field";
    } else if (phone.length < 4) {
      isProceed = false;
      errorMessage = "Phone must be longer than 3 characters";
    } 
     else if (password.length < 6) {
      isProceed = false;
      errorMessage = "Please enter a password longer than 5 characters";
    } else if (confirmPassword.length < 6) {
      isProceed = false;
      errorMessage = "Please enter a confirm password longer than 5 characters";
    } else if (password !== confirmPassword) {
      isProceed = false;
      errorMessage = "Passwords must match";
    }

    if (!isProceed) {
      toast.warn(errorMessage);
    }

    return isProceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let regObj = {
      id: nanoid(),
      name,
      lastname,
      email,
      phone,
      // adress,
      password,
      userWishlist: [],
    };

    if (isValidate()) {
      // fetch("http://localhost:8080/user", {
      fetch("https://json-server-main-yeqa.onrender.com/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regObj),
      })
        .then((res) => {
          toast.success("Registration Successful");
          navigate("/login");
        })
        .catch((err) => {
          toast.error("Failed: " + err.message);
        });
    }
  };
  return (
    <>
      <SectionTitle title="Register" path="Home | Register" />
      <div className="flex flex-col justify-center sm:py-12 ">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className=" border-2 border-[#4a6104] shadow w-full rounded-xl divide-y divide-gray-200">
            <form className="px-5 py-7 border bg-base-200 w-full rounded-xl" onSubmit={handleSubmit}>
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Name
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Lastname
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                E-mail
              </label>
              <input
                type="email"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Phone
              </label>
              <input
                type="tel"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required={true}
              />
              {/* <label className="font-semibold text-sm pb-1 block text-accent-content">
                Adress
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
                required={true}
              /> */}
       <label className="font-semibold text-sm pb-1 block text-accent-content">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#4a6104] focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                  <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>

              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Repeat Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={true}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#4a6104] focus:outline-none"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                   <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="transition duration-200 bg-[#4a6104] hover:bg-[#b6dd40] border-none focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Register</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="py-5 text-center">
            <Link
              to="/login"
              className="btn btn-neutral text-white bg-[#4a6104] hover:bg-[#b6dd40] border-none"
              onClick={() => window.scrollTo(0, 0)}
            >
              Already have an account? Please login.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
