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

    Object.assign(about, req.body);

    if (req.body.services) {
      about.services = Array.isArray(req.body.services) 
        ? req.body.services 
        : JSON.parse(req.body.services);
    }

    if (req.file && req.file.buffer) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, "portfolio/about");
      if (about.image?.public_id) {
        await cloudinary.uploader.destroy(about.image.public_id);
      }
      about.image = { url: uploadResult.secure_url, public_id: uploadResult.public_id };
    }

    await about.save();
    res.json({ success: true, about });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};