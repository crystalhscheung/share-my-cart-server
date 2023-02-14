const { v4: uuid } = require("uuid");
const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("images");

const checkJwt = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    req.payload = "";
    next();
    return;
  }

  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      return res.status(403).send("token not valid");
    } else {
      req.payload = decoded;
    }
  });

  next();
};

const searchItem = async (req, res) => {
  if (req.query.search) {
    const query = req.query.search;
    const itemList = await knex
      .from("items")
      .select("items.*", "users.username as username")
      .where("item_name", "like", `%${query}%`)
      .join("users", "users.id", "items.user_id");
    res.status(200).json(itemList);
  } else if (req.query.category) {
    const query = req.query.category;
    const itemList = await knex
      .from("items")
      .select("items.*", "users.username as username")
      .where("items.category", query.split("-").join(" "))
      .join("users", "users.id", "items.user_id");
    res.status(200).json(itemList);
  }
};

const getOneItem = async (req, res) => {
  const [item] = await knex
    .from("items")
    .select("items.*", "users.username as username")
    .where("items.id", req.params.itemId)
    .join("users", "users.id", "items.user_id");
  if (item) {
    res.status(200).json(item);
  } else res.status(404).send("Item not found");
};

const uploadItem = async (req, res) => {
  const newItem = {
    ...JSON.parse(req.body.newItem),
    id: uuid(),
    user_id: req.payload.id,
    images: req.file.filename,
    status: "In stock",
    price: +JSON.parse(req.body.newItem).price,
  };
  await knex("items").insert(newItem);
  res.status(201).json({ newItemId: newItem.id });
};

const updateItem = async (req, res) => {
  const updatedItem = JSON.parse(req.body.updatedItem);
  delete updatedItem.username;
  if (updatedItem.expiry_date) {
    updatedItem.expiry_date = updatedItem.expiry_date.slice(0, 10);
  }
  if (req.payload.id !== updatedItem.user_id) {
    res.status(403).send("Unauthorized Edit");
  }
  if (req.file) {
    updatedItem.images = req.file.filename;
  }

  await knex("items").where({ id: updatedItem.id }).update(updatedItem);
  res.status(201).json({ id: updatedItem.id });
};

const deleteItem = async (req, res) => {
  const item = await knex("items").where({ id: req.params.itemId });
  if (item[0].user_id !== req.payload.id) {
    res.status(403).send("Unauthorized delete");
  }
  await knex("items").where({ id: req.params.itemId }).del();
  res.status(204).send("Successfullt deleted item");
};

const getAllItemImages = async (_req, res) => {
  const data = await knex.select("images", "id").from("items");
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).send("No item image found");
  }
};

module.exports = {
  searchItem,
  getOneItem,
  uploadItem,
  checkJwt,
  upload,
  updateItem,
  deleteItem,
  getAllItemImages,
};
