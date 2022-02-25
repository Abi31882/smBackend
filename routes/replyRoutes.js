const express = require("express");
const replyController = require("../controllers/replyController");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/").post(userController.protect, replyController.createReply);

module.exports = router;
