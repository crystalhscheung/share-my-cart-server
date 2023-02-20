const knex = require("knex")(require("../knexfile"));
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
const multer = require("multer");
require("dotenv").config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/avatars");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const signup = async (req, res) => {
  const { email, username, password } = req.body;

  const newUser = {
    email,
    username,
    password,
    id: uuid(),
  };

  try {
    await knex("users").insert(newUser);
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_KEY);
    res.json({ token: token });
  } catch (err) {
    res.status(401).send(err.sqlMessage.split("for")[0]);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await knex("users").where({ username }).first();

  if (user?.password === password) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);
    res.json({ token: token });
  } else {
    res.status(401).json({
      error: "Incorrect username or password",
    });
  }
};

const autoLogin = async (req, res) => {
  if (!req.payload.id) {
    res.status(403).send("Token invalid");
  }

  const [user] = await knex("users").where({ id: req.payload.id });

  res.json({
    user: user,
  });
};

const userProfile = async (req, res) => {
  let isThatUser = false;
  const data = await knex
    .select("users.*", "items.*", "items.id as item_id")
    .from("users")
    .leftJoin("items", "users.id", "items.user_id")
    .where("users.id", req.params.userId);

  const user = data[0];
  if (user.item_id) {
    const items_posted = data.map((item) => {
      return {
        item_name: item.item_name,
        quantity: item.quantity,
        price: item.price,
        images: item.images,
        id: item.id,
        user_id: item.user_id,
        username: item.username,
      };
    });
    user.items_posted = items_posted;
  }
  user.id = req.params.userId;

  if (!req.payload) {
    isThatUser = false;
  } else if (req.payload.id === req.params.userId) {
    isThatUser = true;
  }
  res.json({
    isThatUser,
    user: user,
  });
};

const updateProfile = async (req, res) => {
  if (!req.payload.id || req.payload.id !== req.params.userId) {
    res.status(403).send("Unauthorized token");
    return;
  }

  const newProfile = {
    bio: req.body.bio,
  };
  if (req.file) {
    newProfile.avatar = req.file.path.slice(15);
  }
  const data = await knex("users")
    .where("id", req.params.userId)
    .update(newProfile);
  res.status(200).send("Updated");
};

const loginWithGoogle = async (req, res) => {
  const { email, username, avatar, is_login_with_google } = req.body;

  const newUser = {
    email,
    username,
    avatar,
    is_login_with_google,
    id: uuid(),
    bio: "",
  };

  const user = await knex("users").where({ username }).first();

  if (user && is_login_with_google) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);
    res.json({ token: token });
  } else {
    await knex("users").insert(newUser);
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_KEY);
    res.json({ token: token });
  }
};

module.exports = {
  signup,
  login,
  userProfile,
  autoLogin,
  updateProfile,
  upload,
  loginWithGoogle,
};
