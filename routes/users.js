const router = require("express").Router();
const usersController = require("../controllers/usersController.js");

router
  .route("/autologin")
  .get(usersController.checkJwt, usersController.autoLogin);
router.route("/signup").post(usersController.signup);
router.route("/login").post(usersController.login);
router
  .route("/:userId")
  .get(usersController.checkJwt, usersController.userProfile);
router
  .route("/edit/:userId")
  .patch(
    usersController.checkJwt,
    usersController.upload.single("avatar"),
    usersController.updateProfile
  );
router.route("/google").post(usersController.loginWithGoogle);

module.exports = router;
