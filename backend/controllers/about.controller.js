import About from "../models/About/About.model.js";
import cloudinary from "../config/cloudinary.js";

/* ================= GET ABOUT ================= */
export const getAbout = async (req, res) => {
  const about = await About.findOne();
  res.json(about);
};

/* ================= UPDATE ABOUT ================= */
export const updateAbout = async (req, res) => {
  try {
    const {
      subtitle,
      paragraph1,
      paragraph2,
      paragraph3,
      highlightText,
      services,
      location,
    } = req.body;

    let about = await About.findOne();
    if (!about) about = new About();

    /* ---------- SAFE SERVICES PARSING ---------- */
    let parsedServices = [];

    if (Array.isArray(services)) {
      parsedServices = services;
    } else if (typeof services === "string") {
      try {
        parsedServices = JSON.parse(services);
      } catch {
        parsedServices = services
          .split(",")
          .map(s => s.trim())
          .filter(Boolean);
      }
    }

    /* ---------- SAVE DATA FUNCTION ---------- */
    const saveData = async () => {
      about.subtitle = subtitle;
      about.paragraph1 = paragraph1;
      about.paragraph2 = paragraph2;
      about.paragraph3 = paragraph3;
      about.highlightText = highlightText;
      about.services = parsedServices;
      about.location = location;

      await about.save();
      res.json({ success: true, about });
    };

    /* ---------- IMAGE UPLOAD ---------- */
    if (req.file) {
      if (about.image?.public_id) {
        await cloudinary.uploader.destroy(about.image.public_id);
      }

      cloudinary.uploader.upload_stream(
        { folder: "portfolio/about" },
        async (error, result) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error: "Image upload failed" });
          }

          about.image = {
            url: result.secure_url,
            public_id: result.public_id,
          };

          await saveData();
        }
      ).end(req.file.buffer);
    } else {
      await saveData();
    }

  } catch (err) {
    console.error("UPDATE ABOUT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
