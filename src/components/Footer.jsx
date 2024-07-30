import React from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { FaSquareXTwitter, FaSquareFacebook, FaSquareInstagram, FaSquareYoutube } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Footer = () => {
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const socialMediaLinks = [
    { Icon: FaSquareXTwitter, url: "https://twitter.com" },
    { Icon: FaSquareFacebook, url: "https://facebook.com" },
    { Icon: FaSquareInstagram, url: "https://instagram.com" },
    { Icon: FaSquareYoutube, url: "https://youtube.com" },
  ];

  return (
    <footer className="bg-gray-800 text-white py-8  border-t border-gray-700">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <nav className="flex flex-wrap justify-center lg:justify-start mb-4 lg:mb-0">
            <Link
              to="/"
              className="link link-hover text-lg lg:text-xl mx-2"
              onClick={() => window.scrollTo(0, 0)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="link link-hover text-lg lg:text-xl mx-2"
              onClick={() => window.scrollTo(0, 0)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="link link-hover text-lg lg:text-xl mx-2"
              onClick={() => window.scrollTo(0, 0)}
            >
              About us
            </Link>
            <Link
              to="/contact"
              className="link link-hover text-lg lg:text-xl mx-2"
              onClick={() => window.scrollTo(0, 0)}
            >
              Contact
            </Link>
            {!loginState && (
              <>
                <Link
                  to="/login"
                  className="link link-hover text-lg lg:text-xl mx-2"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="link link-hover text-lg lg:text-xl mx-2"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Register
                </Link>
              </>
            )}
          </nav>
          <div className="flex space-x-4 mb-4 lg:mb-0">
            {socialMediaLinks.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl lg:text-3xl hover:text-gray-400 transition-colors"
              >
                <item.Icon />
              </a>
            ))}
          </div>
        </div>
        <div className="text-center mt-4 lg:mt-8">
          <p className="text-sm lg:text-lg">
            &copy; 2024 Cabs Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
