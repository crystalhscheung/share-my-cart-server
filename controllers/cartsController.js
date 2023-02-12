const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");

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

const addItemToCart = async (req, res) => {
  if (!req.payload.id) {
    return;
  }

  const [addedItem] = await knex("shopping_carts").where({
    item_id: req.params.itemId,
    user_id: req.payload.id,
  });

  if (addedItem) {
    const [item] = await knex("items").where({ id: addedItem.item_id });
    if (+item.quantity - +addedItem.quantity >= 1) {
      const newQuantity = +addedItem.quantity + 1;
      const data = await knex("shopping_carts")
        .where({
          item_id: req.params.itemId,
          user_id: req.payload.id,
        })
        .update({
          quantity: newQuantity,
        });
    }
    res.status(201).send("Added to your shopping cart");
  } else {
    const data = await knex("shopping_carts").insert({
      item_id: req.params.itemId,
      user_id: req.payload.id,
    });
    res.status(201).send("Added to your shopping cart");
  }
};

const getItemInCart = async (req, res) => {
  if (!req.payload.id) {
    res.status(403).send("Please log in");
  }
  const data = await knex
    .select(
      "shopping_carts.*",
      "items.*",
      "shopping_carts.quantity as quantity_required",
      "users.username as username"
    )
    .from("shopping_carts")
    .join("items", "shopping_carts.item_id", "items.id")
    .join("users", "users.id", "items.user_id")
    .where("shopping_carts.user_id", req.payload.id);
  if (!data.length) {
    res.json(null);
    return;
  }
  const itemInCart = data.map((item) => {
    return {
      item_id: item.item_id,
      user_id: item.user_id,
      quantity: item.quantity,
      item_name: item.item_name,
      price: item.price,
      description: item.description,
      images: item.images,
      category: item.category,
      quantity_required: item.quantity_required,
      status: item.status,
      username: item.username,
    };
  });
  res.status(200).json(itemInCart);
};

const removeItemFromCart = async (req, res) => {
  const data = await knex("shopping_carts")
    .where({
      item_id: req.params.itemId,
      user_id: req.payload.id,
    })
    .del();
  if (!data) {
    res.status(403).send("Unauthorized delete");
  }
  res.status(204).send("Removed from shopping cart");
};

const changeItemQuantity = async (req, res) => {
  const data = await knex("shopping_carts")
    .where({
      item_id: req.params.itemId,
      user_id: req.payload.id,
    })
    .update({ quantity: req.body.new_quantity_required });
  res.status(204).send("Updated quantity");
};

module.exports = {
  checkJwt,
  addItemToCart,
  getItemInCart,
  removeItemFromCart,
  changeItemQuantity,
};
