const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const indexController = require("../controller/indexController");

router.route("/").get(indexController.showIndex);
router.route("/login").get(authController.showLogin).post(authController.login);
router.route("/index").get(indexController.showIndex);
router
  .route("/register")
  .get(authController.showRegister)
  .post(authController.register);

router.route("/logout").get(authController.logout);

module.exports = router;
