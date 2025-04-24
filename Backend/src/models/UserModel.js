import mongoose from "mongoose"; // Correct import

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  }]
});

// Properly defining the model
const userModel = mongoose.model("User", userSchema, "Users");

export default userModel;
