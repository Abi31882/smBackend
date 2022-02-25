const Discussion = require("../models/discussionModel");
const User = require("../models/userModel.js");
const Reply = require("../models/replyModel");

exports.createDiscussion = async function (req, res) {
  const { topic, description } = req.body;
  const creator = await User.findById(req.body.id).select("-password");
  const discussion = await Discussion.create({
    topic,
    description,
    creator,
  });

  res.status(200).json(discussion);
};

exports.getAll = async function (req, res) {
  const allDiscussions = await Discussion.find();

  res.status(200).json(allDiscussions);
};

exports.getOne = async function (req, res) {
  const discussion = await Discussion.findById(req.params["id"]);
  const id = discussion._id.toString();
  const reply = await Reply.find({ discussion: id });

  res.json({
    discussion,
    reply,
  });
};
