import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    additionalImageUrls: [],
    price: 0,
    brandName: "",
    category: "",
    gender: "",
    isInStock: false,
    productCode: "",
    productionDate: new Date().toISOString(),
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("http://localhost:8080/upload", formData);
      const imageUrl = response.data.imageUrl;
      setFormData((prevData) => ({ ...prevData, imageUrl }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
    }
  };

  const handleAdditionalImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 4); // Limit to maximum of 4 images
    const imageUrls = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        imageUrls.push(reader.result);
        setFormData((prevData) => ({
          ...prevData,
          additionalImageUrls: imageUrls.slice(0, 4), // Limit to maximum of 4 images
        }));
      };
      reader.readAsDataURL(file);
    });
    if (files.length < 2) {
      toast.error("Please upload at least 2 additional images.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/products", formData);
      toast.success("Product created successfully!");
      setFormData({
        name: "",
        description: "",
        imageUrl: "",
        additionalImageUrls: [],
        price: 0,
        brandName: "",
        category: "",
        gender: "",
        isInStock: false,
        productCode: "",
        productionDate: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product.");
    }
  };

  return (
    <div className="container mx-auto">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit} classname="border p-4">
      <div className="border p-2 grid grid-cols-3">
        <div className="border p-2">
               {/* Display imageUrl immediately */}

  
        <label htmlFor="image_upload"> Upload image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          required
        />
        <div className="">
        {formData.imageUrl && (
          <img
            src={formData.imageUrl}
            alt="Product"
            style={{ maxWidth: "200px", maxHeight: "200px" }}
          />
        )}

        {/* Display additionalImageUrls */}
        <div className=" p-1 grid grid-cols-2 my-2">
        {formData.additionalImageUrls &&
          formData.additionalImageUrls.map((imageUrl, index) => (
            <div className=" my-2">

            <img
              key={index}
              src={imageUrl}
              alt={`Additional Image ${index + 1}`}
              style={{ maxWidth: "200px", maxHeight: "200px", marginLeft: "10px", margintop: "10px", }}
              />
              </div>
          ))}
          </div>
        </div>
        {/* Limit additionalImageUrls and display upload button */}
        {formData.additionalImageUrls.length < 4 && (
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleAdditionalImageUpload}
            required
          />
        )}
        </div>
        <div className="border p-4">
        <div className="border p-2">
<label htmlFor="product_name"> Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
   
        </div>

   <div className="border p-2">
   <label htmlFor="product_name"> Product Name</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          />
          </div>
          <div className="border p-2">
          <label htmlFor="product_name"> Product Name</label>
        <input
          type="text"
          name="brandName"
          value={formData.brandName}
          onChange={handleChange}
          placeholder="Brand Name"
          required
          />
          </div>
          <div className="border p-2">
          <label htmlFor="product_name"> Product Name</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
          />
          </div>
          <div className="border p-2">
          <label htmlFor="product_name"> Product Name</label>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          placeholder="Gender"
          required
          />
          </div>
          <div className="border p-2">
        <label>
          <input
            type="checkbox"
            name="isInStock"
            checked={formData.isInStock}
            onChange={handleChange}
            />
          In Stock
        </label>
            </div>
            <div className="border p-2">
              <label htmlFor="productionCode">Production Page</label>
        <input
          type="text"
          name="productCode"
          value={formData.productCode}
          onChange={handleChange}
          placeholder="Product Code"
          required
          />
          
                      </div>
                      <div className="border p-2">
<label htmlFor="productionDate"> Production Date</label>
        <input
          type="date"
          name="productionDate"
          value={formData.productionDate}
          onChange={handleChange}
          placeholder="Production Date"
          required
          />
          </div>
          <div className="border p-2">
<label htmlFor="description"> Description</label>
             <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Product Description"
          required
          />
          </div>
        <button type="submit" className="btn">Create Product</button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
