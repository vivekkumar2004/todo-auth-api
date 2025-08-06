const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  rating: { type: Number, min: 1, max: 5 },
});

module.exports = mongoose.model("Todo", todoSchema);

