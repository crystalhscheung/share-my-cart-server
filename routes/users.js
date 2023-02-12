const router = require("express").Router();
const usersController = require("../controllers/usersController.js");

router.get("/autologin", usersController.checkJwt, usersController.autoLogin);
router.route("/signup").post(usersController.signup);
router.route("/login").post(usersController.login);
router.get("/:userId", usersController.checkJwt, usersController.userProfile);
router.patch(
  "/edit/:userId",
  usersController.checkJwt,
  usersController.upload.single("avatar"),
  usersController.updateProfile
);
router.route("/google").post(usersController.loginWithGoogle);

module.exports = router;
