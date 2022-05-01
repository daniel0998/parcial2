import mongoose from "mongoose";

const proyectSchema = new mongoose.Schema({
  name: String,
  description: String,
  registerDate: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.ObjectId, ref: "users" },
  arrayCollaborators: [],
  dbStatus: Boolean,
});

const proyect = mongoose.model("proyects", proyectSchema);

export default proyect;