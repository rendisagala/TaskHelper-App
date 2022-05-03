const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");
const auth = require("../middleware/verifyToken");

router.route("/").get(auth.verifyToken, controller.showIndex);
router
  .route("/login")
  .get(controller.showLogin)
  .post(controller.login, controller.showIndex);
router.route("/index").get(auth.verifyToken, controller.showIndex);
router
  .route("/register")
  .get(controller.showRegister)
  .post(controller.register);

router.route("/logout").delete(controller.logout);

module.exports = router;
