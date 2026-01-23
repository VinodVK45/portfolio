import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    subtitle: String,
    paragraph1: String,
    paragraph2: String,
    paragraph3: String,
    highlightText: String,
    services: [String],
    location: String,
    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("About", AboutSchema);
