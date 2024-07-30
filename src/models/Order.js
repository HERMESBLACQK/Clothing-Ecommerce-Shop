const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderStatus: {
    type: String,
    enum: ["Ordered", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Ordered",
  },
  statusChangeDate: {
    type: Date,
    default: Date.now,
  },
  // Other order-related fields can be added here
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
