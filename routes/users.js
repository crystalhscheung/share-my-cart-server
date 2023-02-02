const router = require("express").Router();
const usersController = require("../controllers/usersController.js");

router.route("/signup").post(usersController.signup);
router.route("/login").post(usersController.login);
router.get("/:userId", usersController.userProfile);

module.exports = router;
