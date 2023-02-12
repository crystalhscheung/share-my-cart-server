const router = require("express").Router();
const itemsController = require("../controllers/itemsController.js");

router.route("/").get(itemsController.searchItem);
router.route("/images").get(itemsController.getAllItemImages);
router
  .route("/:itemId")
  .get(itemsController.getOneItem)
  .delete(itemsController.checkJwt, itemsController.deleteItem);
router
  .route("/upload")
  .post(
    itemsController.checkJwt,
    itemsController.upload,
    itemsController.uploadItem
  );
router
  .route("/edit/:itemId")
  .patch(
    itemsController.checkJwt,
    itemsController.upload,
    itemsController.updateItem
  );

module.exports = router;
