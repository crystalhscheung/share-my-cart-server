const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token == "null") {
    req.payload = "";
    next();
    return;
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).send("token not valid");
    } else {
      req.payload = decoded;
    }
  });

  next();
};
