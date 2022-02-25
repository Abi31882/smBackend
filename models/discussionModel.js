const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  creator: {
    // unique: true,
    required: true,
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

discussionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "creator",
    select: "userName",
  });
  next();
});

const Discussion = mongoose.model("Discussion", discussionSchema);

module.exports = Discussion;
