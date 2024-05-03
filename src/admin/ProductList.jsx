import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

const handleFilterChange = (e) => {
  const value = e.target.value.toLowerCase();
  setFilter(value);
  
  const filtered = products.filter((product) => {
    // const nameMatch = product.name.toLowerCase().includes(value);
    const categoryMatch = product.category?.toLowerCase().includes(value);
    const tagMatch = product.tag?.toLowerCase().includes(value);
    const idMatch = product.id?.toString().toLowerCase().includes(value);
    // const priceMatch = product.price?.current?.text?.toLowerCase().includes(value);
    // const sizesMatch = product.availableSizes?.some((size) => size.toString().toLowerCase().includes(value));

    return categoryMatch || tagMatch || idMatch;
  });

  setFilteredProducts(filtered);
};


  const renderPrice = (price) => {
    if (typeof price === "object" && price.current && price.current.text) {
      return price.current.text;
    } else if (typeof price === "number" || typeof price === "string") {
      return `$${price}`;
    } else {
      return "N/A";
    }
  };

  const shortenName = (fullName) => {
    const words = fullName.split(" ");
    return words.slice(0, 3).join(" ");
  };

  return (
    <div className="product-list">
      <h2 className="text-2xl p-2">Product List</h2>
      <div className=" p-2 text-center">
      <label className="">
        Filter by Name, Category, or Tag: <br />
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Enter name, category, or tag"
          className="w-6/12 p-2 my-2 placeholder:text-center rounded-md outline-none"
        />
      </label>
      </div>
      <table className="product-table border w-full text-center">
        <thead className="bg-white">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Categories</th>
            <th>Available Sizes</th>
            <th>Price</th>
            <th>Product ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id} className="border">
              <td >
                <img src={product.imageUrl}  className="product-image rounded-full h-[30px] w-[30px] m-auto" />
              </td>
              <td>{shortenName(product.name)}</td>
              <td>{product.category}</td>
              <td>{product.availableSizes ? product.availableSizes.join(", ") : "N/A"}</td>
              <td>{renderPrice(product.price)}</td>
              <td>{product.id}</td>
              <td>
              <Link to={`/ProductDetails/${product.id}`}>
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
