import React from "react";
import { SectionTitle } from "../components";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-page">
      <SectionTitle title="About Us" path="Home | About" />
      <div className="about-content container mx-auto p-4 md:p-8 lg:p-12 bg-white rounded-lg shadow-lg">
        <div className="vision-section mb-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-4">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Vision</h2>
            <p className="text-lg text-gray-600">
              At Cabstore, our vision is to be the leading online clothing store known for exceptional quality, innovative fashion, and unparalleled customer experience. We aspire to empower individuals through style and convenience, making fashion accessible to everyone across the nation.
            </p>
          </div>
          <div className="md:w-1/2 p-4">
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGVjb21tZXJjZXxlbnwwfHx8fDE2Mzc2MzcwNjM&ixlib=rb-1.2.1&q=80&w=1080"
              alt="Our Vision"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="mission-section mb-12 flex flex-col md:flex-row-reverse items-center">
          <div className="md:w-1/2 p-4">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Mission</h2>
            <p className="text-lg text-gray-600">
              Our mission at Cabstore is to provide a seamless and enjoyable shopping experience by offering a wide range of high-quality, stylish clothing. We are committed to:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-600 mt-4">
              <li>Customer Satisfaction: Ensuring every customer feels valued and satisfied with our products and services.</li>
              <li>Quality and Affordability: Delivering the latest fashion trends and timeless classics at competitive prices.</li>
              <li>Innovation: Continuously enhancing our online store with user-friendly features and the latest technology to improve the shopping experience.</li>
              <li>Nationwide Delivery: Offering reliable and efficient national delivery logistics to bring our products to customers' doorsteps swiftly and safely.</li>
              <li>Sustainability: Promoting sustainable fashion practices by sourcing eco-friendly materials and supporting ethical manufacturing processes.</li>
            </ul>
          </div>
          <div className="md:w-1/2 p-4">
            <img
              src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGVjb21tZXJjZXxlbnwwfHx8fDE2Mzc2MzcxMjE&ixlib=rb-1.2.1&q=80&w=1080"
              alt="Our Mission"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="about-section mb-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-4">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">About Us</h2>
            <p className="text-lg text-gray-600">
              Cabstore is an innovative online clothing store dedicated to bringing the latest fashion trends and timeless classics to your doorstep. Established with the aim of redefining the online shopping experience, we offer a diverse range of apparel for all ages and styles. From chic casual wear to elegant evening attire, Cabstore caters to every occasion and preference.
            </p>
            <p className="text-lg text-gray-600 mt-4">
              Our user-friendly website allows you to effortlessly browse through our extensive collection, select your favorites, and enjoy the convenience of national delivery. With a focus on customer satisfaction, we provide top-notch customer service, ensuring a smooth and enjoyable shopping journey from start to finish.
            </p>
          </div>
          <div className="md:w-1/2 p-4">
            <img
              src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfHxlY29tbWVyY2V8ZW58MHx8fHwxNjM3NjM3MTU5&ixlib=rb-1.2.1&q=80&w=1080"
              alt="About Us"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="contact-section text-center mt-12">
          <Link to="/contact" className="btn btn-wide bg-red-600 hover:bg-yellow-400 transition-colors duration-200 text-white py-3 px-6 rounded-lg">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
