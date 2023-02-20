const router = require("express").Router();
const cartsController = require("../controllers/cartsController");
const authorize = require("../middleware/authorize");

router
  .route("/:itemId")
  .post(authorize, cartsController.addItemToCart)
  .delete(authorize, cartsController.removeItemFromCart)
  .put(authorize, cartsController.changeItemQuantity);

router.route("/").get(authorize, cartsController.getItemInCart);

module.exports = router;
