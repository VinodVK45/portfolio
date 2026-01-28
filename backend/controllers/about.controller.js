import About from "../models/About/About.model.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

/* ================= SAFE JSON PARSER ================= */
const safeParse = (data) => {
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

    res.json(
      about || {
        subtitle: "About Me",
        services: [],
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

/* ================= UPDATE ABOUT ================= */
export const updateAbout = async (req, res) => {
  try {
    let about = (await About.findOne()) || new About();

    /* ---------- TEXT FIELDS ---------- */
    const fields = [
      "subtitle",
      "paragraph1",
      "paragraph2",
      "paragraph3",
      "highlightText",
      "location",
    ];

    fields.forEach((field) => {
      if (req.body[field]) {
        about[field] = req.body[field];
      }
    });

    /* ---------- SERVICES ARRAY ---------- */
    if (req.body.services) {
      about.services = safeParse(req.body.services);
    }

    /* ---------- IMAGE UPLOAD ---------- */
    if (req.file) {
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

    res.json({
      success: true,
      about,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
