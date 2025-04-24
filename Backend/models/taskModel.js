const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

// Link to existing "tasks" collection
module.exports = mongoose.model("Task", taskSchema, "tasks");
