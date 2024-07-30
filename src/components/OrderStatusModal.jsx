import React, { useState } from "react";

const OrderStatusModal = ({ onClose, onUpdateStatus, statusChangeDates }) => {
  const [newStatus, setNewStatus] = useState("");

  const handleStatusChange = () => {
    onUpdateStatus(newStatus);
    onClose();
  };

  return (
    <div className="order-status-modal">
      <h3>Select New Status</h3>
      <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="border-2 my-4">
        <option value="Pending">Pending</option>
        <option value="Processing">Processing</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
      </select> <br />
      <button onClick={handleStatusChange} className="btn bg-[#dc0000] hover:bg-[#ffcc00] border-none text-white mr-4">Update Status</button>
      <button onClick={onClose} className="btn bg-red-500 hover:bg-gray-500 text-white">Cancel</button>
      {statusChangeDates && statusChangeDates.length > 0 && (
        <div>
          <h4>Status Change History:</h4>
          <ul>
            {statusChangeDates.map((date, index) => (
              <li key={index}>{date}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderStatusModal;
