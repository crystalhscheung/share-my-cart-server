const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use(express.json());
app.use(express.static("./public"));

const userRouters = require("./routes/users");
const itemRouters = require("./routes/items");
const cartRouters = require("./routes/carts");

app.use("/items", itemRouters);
app.use("/user", userRouters);
app.use("/cart", cartRouters);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
