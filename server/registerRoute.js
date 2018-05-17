const express = require("express");
const router = express.Router();
const Register = require("./registerModel.js");
const jwt = require("jsonwebtoken");

const { protected } = require("./strategies.js");
const secret = "that is what I shared yesterday lol";

router.get("/", protected, (req, res) => {
  Register.find({})
    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: "we are not able to connect you " });
    });
});

function makeToken(user) {
  const timestamp = new Date().getTime();
  const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username
  };
  const options = {
    expiresIn: "24h"
  };
  const x = jwt.sign(payload, secret, options);
  console.log("x", x);

  return x;
}

router.post("/", (req, res) => {
  console.log("req", req.body.username);
  newRegister = new Register(req.body);
  newRegister
    .save()
    .then(p => {
      console.log("p", p);
      const token = makeToken(p);

      res.status(200).json({ msg: " registered successfully ", p, token });
    })
    .catch(err => {
      res.status(500).json({ msg: "not able to register" });
    });
});

module.exports = router;
