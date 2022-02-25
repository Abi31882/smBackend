const Discussion = require("../models/discussionModel");
const User = require("../models/userModel.js");
const Reply = require("../models/replyModel");

exports.createReply = async function (req, res) {
  const replier = await User.findById(req.body.userID);
  if (!replier) {
    return res.json("There is no replier given");
  }
  const discussion = await Discussion.findById(req.body.discussionID);
  if (!discussion) {
    return res.json("There is no discussion given");
  }
  if (!req.body.reply) {
    return res.json("you must write in something");
  }
  const repli = await Reply.create({
    reply: req.body.reply,
    discussion,
    replier: replier.userName,
  });
  res.status(200).json(repli);
};
