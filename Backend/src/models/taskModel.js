import mongoose from "mongoose"; // Fixed import

const taskSchema = new mongoose.Schema({ // Fixed `Mongoose` to `mongoose`
  title: String,
  description: String,
  completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema, "Tasks"); // Fixed `TASK` to `Task`

export default Task; // Fixed export
