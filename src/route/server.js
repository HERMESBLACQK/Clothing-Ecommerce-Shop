const express = require("express");
const jsonServer = require("json-server");
const server = express();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(express.json());

// Custom PATCH endpoint to handle address updates

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
