const jwt = require("jsonwebtoken");

const secret = "that is what I shared yesterday lol";

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

module.exports = { makeToken, secret };
