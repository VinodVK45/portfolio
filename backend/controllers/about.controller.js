import About from "../models/About/About.model.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

/* ================= SAFE PARSE ================= */
const safeParse = (data) => {
  if (!data) return [];
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return Array.isArray(data) ? data : [];
};

/* ================= GET ABOUT ================= */
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about || { subtitle: "About Me", services: [] });
  } catch {
    res.status(500).json({ message: "Fetch failed" });
  }
};

/* ================= UPDATE ABOUT ================= */
export const updateAbout = async (req, res) => {
  try {
    let about = (await About.findOne()) || new About();

    const fields = [
      "subtitle",
      "paragraph1",
      "paragraph2",
      "paragraph3",
      "highlightText",
      "location",
    ];

    fields.forEach((f) => {
      if (req.body[f] !== undefined) {
        about[f] = req.body[f];
      }
    });

    // ✅ SAFE SERVICES
    if (req.body.services !== undefined) {
      about.services = safeParse(req.body.services);
    }

    // ✅ IMAGE IS OPTIONAL
    if (req.file?.buffer) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "portfolio/about"
      );
      about.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    await about.save();
    res.json({ success: true, about });
  } catch (err) {
    console.error("ABOUT UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
