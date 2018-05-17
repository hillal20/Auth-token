const express = require("express");
const router = express.Router();
const Register = require("./registerModel.js");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { authenticate } = require("./strategies");
const { makeToken } = require("./tokenAndSecret.js");

router.get("/", (req, res) => {
  res.status(200).json({ msg: "welcome to login" });
});

router.post("/", authenticate, (req, res) => {
  res.status(200).json({
    token: makeToken(req.user),
    user: req.user,
    masg: "you logged-in  succefully"
  });
});

module.exports = router;
