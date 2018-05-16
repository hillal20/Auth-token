const express = require("express");
const router = express.Router();
const Register = require("./registerModel.js");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const passport = require("passport");
const LocalStrategy = require("passport-local");
// const jwt = require("jsonwebtoken");
// const secret = "that is what I shared yesterday lol";

router.get("/", (req, res) => {
  res.status(200).json({ msg: "welcome to login" });
});

const localStrategy = new LocalStrategy(function(username, password, done) {
  Register.findOne({ username })

    .then(user => {
      if (!user) {
        done(null, false);
      } else {
        user
          .isPasswordValid(password) // password is valid
          .then(isValid => {
            if (isValid) {
              const { _id, username } = user;
              return done(null, { _id, username }); // this ends in req.user
            } else {
              return done(null, false);
            }
          })
          .catch(err => {
            return done(err);
          });
      }
    })
    .catch(err => done(err));
});

// function makeToken(user) {
//   const timestamp = new Date().getTime();
//   const payload = {
//     sub: user._id,
//     iat: timestamp,
//     username: user.username
//   };
//   const options = {
//     expiresIn: "24h"
//   };
//   const p = jwt.sign(payload, secret, options);
//   console.log(p);

//   return p;
// }

const passportOptions = { session: false };
passport.use(localStrategy);
const authenticate = passport.authenticate("local", passportOptions);

router.post("/", authenticate, (req, res) => {
  // if we're here the user logged in correctly
  res.status(200).json({ user: req.user });
});

// router.post("/", (req, res) => {
//   const { username, password } = req.body;

//   Register.findOne({ username })
//     .then(p => {
//       if (p) {
//         p
//           .isPasswordValid(password)

//           .then(result => {
//             if (result) {
//               res.status(200).json("login successful, we have a cookie asWell");
//             } else {
//               res.status(401).json("invalid password");
//             }
//           });
//       } else {
//         res.status(401).json("invalid username");
//       }
//     })
//     .catch(err => res.json(err));
// });

module.exports = router;
// function authentication(req, res, next) {
//   Register.find({ username: req.body.username }).then(users => {
//     const userPassword = users[0].password;
//     bcrypt.compare(req.body.password, userPassword, (err, result) => {
//       if (err) {
//         res.send(err);
//       }
//       if (result) {
//         next();
//       } else {
//         res.send(" you can not pass , your password is incorrect");
//       }
//     });
//   });
// }

// router.post("/", authentication, (req, res) => {
//   const { username, password } = req.body;

//   res.status(200).json({ username: username, password: password });
// });
