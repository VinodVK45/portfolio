import mongoose from "mongoose";

const FooterSchema = new mongoose.Schema({
  message: String,
  email: String,
  phone: String,
  adminIcon: {
    type: String,
    default: "Shield",
  },
  socials: [
    {
      label: String,
      link: String,
      icon: String,
    },
  ],
});

export default mongoose.model("Footer", FooterSchema);
