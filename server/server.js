const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

server = express();
server.use(express.json());
server.use(cors());

mongoose
  .connect("mongodb://localhost:27017/authDB")
  .then(conn => {
    console.log(" connected to authDB");
  })
  .catch(err => {
    console.log(`err: ${err}`);
  });

server.get("/", (req, res) => {
  res.status(200).json({ msg: " app is running just be happy!!!!" });
});

const registerRoute = require("./registerRoute.js");
server.use("/api/registers", registerRoute);

const loginRoute = require("./loginRoute.js");
server.use("/api/login", loginRoute);

const logoutRoute = require("./logoutRoute.js");
server.use("/api/logout", logoutRoute);

server.listen(9000, () => {
  console.log("\n=== Api running on port 9000===\n");
});
