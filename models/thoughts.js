const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thoughtsSchema = new Schema({
  thoughtsText: {
    type: String,
    required: true,
    min: 1,
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
  reactions: [String],
});
module.exports = mongoose.model("Thoughts", thoughtsSchema);
