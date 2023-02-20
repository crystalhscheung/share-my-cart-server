const router = require("express").Router();
const usersController = require("../controllers/usersController.js");
const authorize = require("../middleware/authorize");

router.route("/autologin").get(authorize, usersController.autoLogin);
router.route("/signup").post(usersController.signup);
router.route("/login").post(usersController.login);
router.route("/:userId").get(authorize, usersController.userProfile);
router
  .route("/edit/:userId")
  .patch(
    authorize,
    usersController.upload.single("avatar"),
    usersController.updateProfile
  );
router.route("/google").post(usersController.loginWithGoogle);

module.exports = router;
