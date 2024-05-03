import React from "react";
import "../index.css"
import { Link } from "react-router-dom";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareYoutube } from "react-icons/fa6";
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
    <footer className="footer footer-center p-6  text-base-content mt-6 border rounded max-md:px-0 bgc">
      <nav className="grid grid-flow-col max-sm:grid-flow-row gap-4">
        <Link to="/" className="link link-hover text-xl max-md:text-xl text-accent-content" onClick={() => window.scrollTo(0, 0)}>
          Home
        </Link>
        <Link to="/shop" className="link link-hover text-xl max-md:text-xl text-accent-content" onClick={() => window.scrollTo(0, 0)}>
          Shop
        </Link>
        <Link to="/about" className="link link-hover text-xl max-md:text-xl text-accent-content" onClick={() => window.scrollTo(0, 0)}>
          About us
        </Link>
        <Link to="/contact" className="link link-hover text-xl max-md:text-xl text-accent-content" onClick={() => window.scrollTo(0, 0)}>
          Contact
        </Link>
        {!loginState && (
          <>
            <Link
              to="/login"
              className="link link-hover text-xl max-md:text-xl text-accent-content"
              onClick={() => window.scrollTo(0, 0)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="link link-hover text-xl max-md:text-xl text-accent-content"
              onClick={() => window.scrollTo(0, 0)}
            >
              Register
            </Link>
          </>
        )}
      </nav>
      <nav>
      <div className="grid grid-flow-col gap-4">
        {socialMediaLinks.map((item, index) => (
          <a key={index} href={item.url} target="_blank" rel="noopener noreferrer">
            <item.Icon className="text-4xl max-sm:text-4xl text-accent-content" />
          </a>
        ))}
      </div>
    </nav>
      <aside>
        <p className="text-xl max-sm:text-sm text-accent-content">
          Copyright © 2024 - All right reserved by Cabs Store
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
