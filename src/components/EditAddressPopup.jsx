import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditAddressPopup = ({ isOpen, onClose, onSave, initialValues }) => {
  const [formData, setFormData] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressEdit = async () => {
    try {
      if (formData.id !== "address1" && formData.id !== "address2") {
        throw new Error("Invalid address ID");
      }

      // Update the address in the database using PATCH request
      await axios.patch(`http://localhost:8080/user/${formData.id}`, {
        street: formData.street,
        region: formData.region,
        state: formData.state,
      });

      // Call the onSave callback to update the address in the parent component
      onSave(formData);
      onClose(); // Close the popup
      toast.success("Address updated successfully");
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Error updating address: Invalid address ID or no address selected for edit");
    }
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-content bg-white p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Edit Address</h2>
        <label className="block mb-2">
          Street:
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-1"
          />
        </label>
        <label className="block mb-2">
          Region:
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-1"
          />
        </label>
        <label className="block mb-4">
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-1"
          />
        </label>
        <div className="flex justify-end">
          <button onClick={handleAddressEdit} className="btn bg-blue-500 text-white mr-2">
            Save
          </button>
          <button onClick={onClose} className="btn bg-gray-500 text-white">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAddressPopup;
