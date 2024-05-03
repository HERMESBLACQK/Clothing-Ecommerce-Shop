const express = require("express");
const jsonServer = require("json-server");
const server = express();
const router = jsonServer.router("../components/data/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(express.json());

// Custom PATCH endpoint to handle address updates
server.patch("/user/:id", (req, res) => {
  const { id } = req.params;
  const { address1, address2 } = req.body;

  // Update the addresses in your db.json file
  if (address1) {
    router.db.get("users").find({ id }).assign({ address1 }).write();
  }
  if (address2) {
    router.db.get("users").find({ id }).assign({ address2 }).write();
  }

  res.status(200).json({ message: "Addresses updated successfully" });
});

// Use the JSON server router
server.use(router);

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
