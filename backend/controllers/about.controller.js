import About from "../models/About/About.model.js";
import cloudinary, { uploadToCloudinary } from "../config/cloudinary.js";

export const getAbout = async (req, res) => {
  const about = await About.findOne();
  res.json(about || { subtitle: "About Me", services: [] });
};

export const updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) about = new About();

    // Safely update fields one by one instead of Object.assign
    const { subtitle, paragraph1, paragraph2, paragraph3, highlightText, location } = req.body;
    if (subtitle) about.subtitle = subtitle;
    // ... repeat for other text fields

    if (req.body.services) {
      try {
        // Only parse if it's a string; if it's already an array, use it directly
        about.services = typeof req.body.services === "string" 
          ? JSON.parse(req.body.services) 
          : req.body.services;
      } catch (e) {
        console.error("Services parse error:", e);
      }
    }

    /* ---------- IMAGE UPLOAD ---------- */
    if (req.file && req.file.buffer) {
       // ... existing cloudinary logic
    }

    await about.save();
    return res.json({ success: true, about });
  } catch (err) {
    console.error("DETAILED UPDATE ERROR:", err); // Look at your Render logs for this!
    return res.status(500).json({ message: err.message });
  }
};