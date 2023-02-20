const router = require("express").Router();
const itemsController = require("../controllers/itemsController.js");
const authorize = require("../middleware/authorize");

router.route("/").get(itemsController.searchItem);
router.route("/images").get(itemsController.getAllItemImages);
router
  .route("/:itemId")
  .get(itemsController.getOneItem)
  .delete(authorize, itemsController.deleteItem);
router
  .route("/upload")
  .post(authorize, itemsController.upload, itemsController.uploadItem);
router
  .route("/edit/:itemId")
  .patch(authorize, itemsController.upload, itemsController.updateItem);

module.exports = router;
