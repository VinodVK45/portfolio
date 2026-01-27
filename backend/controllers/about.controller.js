import About from "../models/About/About.model.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

const safeParse = (data) => {
  if (typeof data === "string") {
    try { return JSON.parse(data); } catch { return []; }
  }
  return Array.isArray(data) ? data : [];
};

export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about || { subtitle: "About Me", services: [] });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

export const updateAbout = async (req, res) => {
  try {
    let about = await About.findOne() || new About();

    // Explicitly map fields to prevent undefined errors
    const fields = ["subtitle", "paragraph1", "paragraph2", "paragraph3", "highlightText", "location"];
    fields.forEach(f => { if (req.body[f] !== undefined) about[f] = req.body[f]; });

    // Handle services (frontend might send string or array)
    if (req.body.services) {
      about.services = typeof req.body.services === "string" 
        ? JSON.parse(req.body.services) 
        : req.body.services;
    }

    // Image Upload Logic
    if (req.file && req.file.buffer) {
      const result = await uploadToCloudinary(req.file.buffer, "portfolio/about");
      about.image = { url: result.secure_url, public_id: result.public_id };
    }

    await about.save();
    res.json({ success: true, about });
  } catch (err) {
    console.error("UPDATE ABOUT ERROR:", err);
    res.status(500).json({ message: "Server error during update" });
  }
};