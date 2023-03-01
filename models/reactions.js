const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    max: 280,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
  userName: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Reactions", reactionSchema);
