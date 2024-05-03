import React from "react";
import { SectionTitle } from "../components";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <SectionTitle title="About Us" path="Home | About" />
      <div className="about-content text-center max-w-4xl bg-base-200 py-4 mx-auto mt-5 border-[#4a6104] border-4 rounded-xl px-6">
      <h2 className="text-6xl text-center mb-10 max-sm:text-3xl text-accent-content">We love our customers!</h2>
      <p className="text-lg text-center max-sm:text-sm max-sm:px-2 text-accent-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
        obcaecati eum est commodi, quam, ut quidem deleniti quos quod temporibus
        dicta deserunt voluptates ab! Deleniti id repellat, labore fugiat
        obcaecati dolorem minima fugit quasi nam velit reiciendis delectus ea
        tempora.
      </p>
      <Link to="/contact" className="btn btn-wide bg-[#4a6104] hover:bg-[#b6dd40] border-none text-white mt-5">Contact Us</Link>
      </div>
    </div>
  );
};

export default About;
