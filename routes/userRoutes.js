const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/signup").post(userController.singup);
router.route("/login").post(userController.login);
router.get(
  "/me",
  userController.protect,
  userController.getMe,
  userController.getUser
);
module.exports = router;
