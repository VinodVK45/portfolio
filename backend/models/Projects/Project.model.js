import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    desc: {
      type: String,
      required: true,
      trim: true,
    },

    img: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["web", "uiux", "editing"],
      required: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
