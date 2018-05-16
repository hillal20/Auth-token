const express = require("express");
const router = express.Router();
const Register = require("./registerModel.js");

const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

const secret = "that is what I shared yesterday lol";

router.get("/", (req, res) => {
  Register.find({})
    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: "we are not able to connect you " });
    });
});
//-------- making token ------------

// passport global middleware
// passport.use(localStrategy);
// passport.use(jwtStrategy);

// passport local middleware
// const passportOptions = { session: false };
// const authenticate = passport.authenticate("local", passportOptions);
// const protected = passport.authenticate("jwt", passportOptions);

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
  const p = jwt.sign(payload, secret, options);
  console.log(p);

  return p;
}

/////-----------------------------------
router.post("/", (req, res) => {
  newRegister = new Register(req.body);
  newRegister
    .save()
    .then(p => {
      const token = makeToken(p);

      res.status(200).json({ msg: " registered successfully ", p, token });
    })
    .catch(err => {
      res.status(500).json({ msg: "not able to register" });
    });
});

module.exports = router;
