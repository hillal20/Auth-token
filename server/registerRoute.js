const express = require("express");
const router = express.Router();
const Register = require("./registerModel.js");
const { makeToken, secret } = require("./tokenAndSecret.js");
const { protected } = require("./strategies.js");

router.get("/", protected, (req, res) => {
  Register.find({})
    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: "we are not able to connect you " });
    });
});

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
