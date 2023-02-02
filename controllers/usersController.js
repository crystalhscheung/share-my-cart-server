const fs = require("fs");
const knex = require("knex")(require("../knexfile"));
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  console.log(req.body);
  const { email, username, password } = req.body;

  const newUser = {
    email,
    username,
    password,
    id: uuid(),
  };

  try {
    await knex("users").insert(newUser);
    const token = jwt.sign({ id: newUser.id }, "secretkey");
    res.json({ token: token });
  } catch (err) {
    console.log(err.sqlMessage);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await knex("users").where({ username }).first();

  if (user?.password === password) {
    const token = jwt.sign({ id: user.id }, "secretkey");
    res.json({ token: token });
  } else {
    res.status(401).json({
      error: "Login failed",
    });
  }
};

const checkJwt = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      res.status(403).send("token not valid");
    } else {
      req.payload = decoded;
      console.log(decoded);
    }
  });

  next();
};

const userProfile = async (req, res) => {
  const [user] = await knex("users").where({ id: req.params.userId });
  res.json(user);
};

module.exports = { signup, login, checkJwt, userProfile };
