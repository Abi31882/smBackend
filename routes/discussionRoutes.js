const express = require("express");
const discussionController = require("../controllers/discussionController");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .route("/createDiscussion")
  .post(userController.protect, discussionController.createDiscussion);
router.route("/getAll").get(discussionController.getAll);
router.route("/getOne/:id").get(discussionController.getOne);

module.exports = router;
