const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

let orders = [
  {
    id: 1,
    orderStatus: "Pending",
    cartItems: [
      {
        id: 1,
        title: "Product 1",
        image: "product1.jpg",
        selectedSize: "M",
        amount: 2,
        price: 25.99,
      },
      {
        id: 2,
        title: "Product 2",
        image: "product2.jpg",
        selectedSize: "L",
        amount: 1,
        price: 39.99,
      },
    ],
    subtotal: 91.97,
  },
  {
    id: 2,
    orderStatus: "Delivered",
    cartItems: [
      {
        id: 3,
        title: "Product 3",
        image: "product3.jpg",
        selectedSize: "S",
        amount: 3,
        price: 15.49,
      },
    ],
    subtotal: 46.47,
  },
  // Add more orders as needed
];

// Get all orders
app.get("/orders", (req, res) => {
  res.json(orders);
});

// Update order status
app.put("/orders/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const updatedOrder = req.body;

  orders = orders.map((order) =>
    order.id === orderId ? { ...order, ...updatedOrder } : order
  );

  res.json(updatedOrder);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
