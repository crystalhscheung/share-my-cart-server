const router = require("express").Router();
const itemsController = require("../controllers/itemsController.js");

// router.route("/add/:id").post(itemsController.addItem);

router.route("/").get(itemsController.searchItem);
router.route("/:itemId").get(itemsController.getOneItem);

module.exports = router;
