const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Order = require("./models/Order"); // Assuming you have a MongoDB model for orders
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/your_database_name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Update order status and save status change date
app.put("/orders/:id", async (req, res) => {
  const orderId = req.params.id;
  const newStatus = req.body.orderStatus;
  const currentDate = new Date().toISOString();

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: newStatus, statusChangeDate: currentDate },
      { new: true }
    );

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Failed to update order status" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
