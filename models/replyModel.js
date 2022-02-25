const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  reply: {
    type: String,
    required: true,
  },
  discussion: {
    type: mongoose.Schema.ObjectId,
    required: true,
    unique: false,
  },
  replier: {
    type: String,
    required: true,
  },
});

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
