import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },

  image: String,
  gallery: [String], // multiple images

  liveUrl: String,
  githubUrl: String,

  tools: [String],

  category: {
    type: String,
    enum: ["Web", "Mobile", "Backend", "Marketing", "Design"],
  },

  results: String,

  featured: { type: Boolean, default: false },

  order: Number, // manual sorting

}, { timestamps: true });

export default mongoose.model("Project", projectSchema);