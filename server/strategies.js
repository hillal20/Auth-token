const passport = require("passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const jwt = require("jsonwebtoken");
const Register = require("./registerModel.js");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { secret } = require("./tokenAndSecret.js");

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
              return done(null, {
                _id,
                username,
                masg: "you logged-in  succefully"
              }); // this ends in req.user
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

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, done) {
  Register.findById(payload.sub)
    .then(user => {
      if (user) {
        done(null, user); // this is req.user
      } else {
        done(null, false);
      }
    })
    .catch(err => {
      done(err);
    });
});

const passportOptions = { session: false };
passport.use(localStrategy);
passport.use(jwtStrategy);
const authenticate = passport.authenticate("local", passportOptions);
const protected = passport.authenticate("jwt", passportOptions);
module.exports = { authenticate, protected };
