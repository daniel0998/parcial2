import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  name: String,
  proyectId: { type: mongoose.Schema.ObjectId, ref: "proyects" },
  registerDate: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

const list = mongoose.model("lists", listSchema);

export default list;