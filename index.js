const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const Thoughts = require("./models/thoughts");
const Reactions = require("./models/reactions");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(
  "mongodb+srv://Seannzeribe:Nsopulu777@module-18.8wn5lwy.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function () {
  console.log("Database Connected");
});

// Testing Route

app.get("/", (req, res) => {
  console.log("hello");
  res.send("Working");
});

// Users Route

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

app.get("/api/users/:_id", async (req, res) => {
  const user = await User.findById(req.params._id);
  if (user) {
    res
      .status(200)
      .json({ "User Details": user, "No. of friends": user.friends.length });
  } else {
    res.status(200).json("No user found");
  }
});

app.post("/api/users", async (req, res) => {
  const user = new User({ username: req.body.username, email: req.body.email });
  await user.save();
  res.status(200).json({ user });
});

app.put("/api/users/:_id", async (req, res) => {
  const user = await User.findById(req.params._id);
  user.username = req.body.username;
  user.email = req.body.email;
  await user.save();
  res.status(200).json({ user });
});

app.delete("/api/users/:_id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params._id);
  res.status(200).json({ user });
});

// Friends Route

app.post("/api/users/:userId/friends/:friendId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  user.friends.push(req.params.friendId);
  await user.save();
  res.status(200).json({ user });
});

app.delete("/api/users/:userId/friends/:friendId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  const friends = user.friends.filter((id) => id !== req.params.friendId);
  user.friends = friends;
  await user.save();
  res.status(200).json({ user });
});

// Thoughts Route

app.get("/api/thoughts", async (req, res) => {
  const thoughts = await Thoughts.find();
  res.status(200).json(thoughts);
});

app.get("/api/thoughts/:_id", async (req, res) => {
  const thoughts = await Thoughts.findById(req.params._id);
  if (thoughts) {
    res.status(200).json({ "Thought Details": thoughts });
  } else {
    res.status(200).json("No Thought found");
  }
});

app.post("/api/thoughts/:_id", async (req, res) => {
  const user = await User.findById(req.params._id);
  const date = new Date();
  const thought = new Thoughts({
    thoughtsText: req.body.thoughtsText,
    createdAt: date,
    userName: user.username,
  });
  await thought.save();
  user.thoughts.push(thought._id);
  await user.save();
  res.status(200).json({ user, thought });
});

app.put("/api/thoughts/:_id", async (req, res) => {
  const thought = await Thoughts.findById(req.params._id);
  const date = new Date();
  thought.thoughtsText = req.body.thoughtsText;
  await thought.save();
  res.status(200).json({ thought });
});

app.delete("/api/thoughts/:_id", async (req, res) => {
  const thought = await Thoughts.findByIdAndDelete(req.params._id);
  res.status(200).json({ thought });
});

// Reactions Route

app.post("/api/thoughts/:thoughtId/reactions", async (req, res) => {
  const thought = await Thoughts.findById(req.params.thoughtId);
  const user = await User.findOne({ username: thought.userName });
  const date = new Date();
  const reaction = new Reactions({
    reactionBody: req.body.reactionBody,
    createdAt: date,
    userName: user.username,
  });
  await reaction.save();
  thought.reactions.push(reaction._id);
  res.status(200).json({ thought, reaction });
});

app.delete(
  "/api/thoughts/:thoughtId/reactions/:reactionId",
  async (req, res) => {
    const reaction = await Reactions.findByIdAndDelete(req.params.reactionId);
    const thought = await Thoughts.findById(req.params.thoughtId);
    const reactions = thought.reactions.filter((id) => id !== reactionId);
    thought.reactions = reactions;
    await thought.save();
    res.status(200).json({ thought });
  }
);
app.listen(3000, () => {
  console.log("Server runing on port 3000");
});
