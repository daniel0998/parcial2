import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  taskStatus: String,
  imageUrl: String,
  listId: { type: mongoose.Schema.ObjectId, ref: "lists" },
  registerDate: { type: Date, default: Date.now },
});

const task = mongoose.model("tasks", taskSchema);
export default task;
