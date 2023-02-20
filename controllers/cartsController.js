const knex = require("knex")(require("../knexfile"));

const addItemToCart = async (req, res) => {
  if (!req.payload.id) {
    res.status(403).send("Please log in");
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
    return;
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
  if (!req.payload.id) {
    res.status(403).send("Please log in");
    return;
  }
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
  if (!req.payload.id) {
    res.status(403).send("Please log in");
    return;
  }
  const data = await knex("shopping_carts")
    .where({
      item_id: req.params.itemId,
      user_id: req.payload.id,
    })
    .update({ quantity: req.body.new_quantity_required });
  res.status(204).send("Updated quantity");
};

module.exports = {
  addItemToCart,
  getItemInCart,
  removeItemFromCart,
  changeItemQuantity,
};
