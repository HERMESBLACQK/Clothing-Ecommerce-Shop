import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionTitle } from "../components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../store";
import { loginUser, logoutUser } from "../features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (loginState) {
      localStorage.clear();
      store.dispatch(logoutUser());
    }
  }, []);

  const isValidate = () => {
    let isProceed = true;

    if (email.length === 0) {
      isProceed = false;
      toast.warn("Please enter a email");
    } else if (password.length < 6) {
      isProceed = false;
      toast.warn("Password must be minimum 6 characters");
    }
    return isProceed;
  };

  const proceedLogin = (e) => {
    e.preventDefault();
    if (isValidate()) {
      // fetch("http://localhost:8080/user")
      fetch("https://json-server-main-yeqa.onrender.com/user")
        .then((res) => res.json())
        .then((res) => {
          let data = res;
          const foundUser = data.filter(
            (item) => item.email === email && item.password === password
          );
          if (foundUser[0]) {
            toast.success("Login successful");
            localStorage.setItem("id", foundUser[0].id);
            store.dispatch(loginUser());
            navigate("/");
          } else {
            toast.warn("Email or password is incorrect");
          }
        })
        .catch((err) => {
          toast.error("Login failed due to: " + err.message);
        });
    }
  };

  return (
    <div className="h-screen bg-gray-100">
      <SectionTitle title="Login" path="Home | Login" />
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
          <form onSubmit={proceedLogin}>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <label className="block mb-2">
              <span className="text-gray-700">E-mail</span>
              <input
                type="email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-2 pl-10 text-sm text-gray-700"
                placeholder="example@example.com"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Password</span>
              <input
                type="password"
                value={password}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full p-2 pl-10 text-sm text-gray-700"
                placeholder="Password"
              />
            </label>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <Link
              to="/register"
              className="text-gray-500 hover:text-gray-900"
              onClick={() => window.scrollTo(0, 0)}
            >
              Don't have an account? Please register.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;