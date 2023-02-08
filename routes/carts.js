const router = require("express").Router();
const cartsController = require("../controllers/cartsController");

router
  .route("/:itemId")
  .post(cartsController.checkJwt, cartsController.addItemToCart)
  .delete(cartsController.checkJwt, cartsController.removeItemFromCart)
  .put(cartsController.checkJwt, cartsController.changeItemQuantity);

router.route("/").get(cartsController.checkJwt, cartsController.getItemInCart);

module.exports = router;
