const { v4: uuid } = require("uuid");
const knex = require("knex")(require("../knexfile"));

// const addItem = (req, res) => {
//   const itemList = getItems();
//   const user_id = req.params.id;
//   console.log(req.body);
//   const {
//     item_name,
//     quantity,
//     price,
//     expiry_date,
//     description,
//     images,
//     category,
//   } = req.body;

//   const newItem = {
//     id: uuid(),
//     user_id,
//     item_name,
//     quantity,
//     price,
//     expiry_date,
//     description,
//     images,
//     category,
//     status: "In stock",
//   };

//   const newItemList = [...itemList, newItem];
//   fs.writeFileSync("./data/itemsData.json", JSON.stringify(newItemList));
//   res.status(201).json(newItemList);
// };

const searchItem = async (req, res) => {
  const query = req.query.search;
  const itemList = await knex
    .from("items")
    .select("items.*", "users.username as username")
    .where("item_name", "like", `%${query}%`)
    .join("users", "users.id", "items.user_id");

  res.status(200).json(itemList);
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
module.exports = { searchItem, getOneItem };
