import About from "../models/About/About.model.js";
import cloudinary from "../config/cloudinary.js";

/* ================= GET ABOUT ================= */
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();

    if (!about) {
      return res.status(200).json({
        subtitle: "About Me",
        paragraph1: "",
        paragraph2: "",
        paragraph3: "",
        highlightText: "",
        services: [],
        location: "",
        image: null,
      });
    }

    return res.json(about);
  } catch (err) {
    console.error("GET ABOUT ERROR:", err);
    return res.status(500).json({ message: "Failed to fetch About" });
  }
};

/* ================= UPDATE ABOUT (4K SAFE) ================= */
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

    /* ---------- SERVICES ---------- */
    let parsedServices = [];
    if (Array.isArray(services)) parsedServices = services;
    else if (typeof services === "string") {
      try {
        parsedServices = JSON.parse(services);
      } catch {
        parsedServices = services
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }

    about.subtitle = subtitle;
    about.paragraph1 = paragraph1;
    about.paragraph2 = paragraph2;
    about.paragraph3 = paragraph3;
    about.highlightText = highlightText;
    about.services = parsedServices;
    about.location = location;

    /* ---------- IMAGE UPLOAD ---------- */
    if (req.file && req.file.buffer) {
      let uploadResult;

      try {
        uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "portfolio/about",
              resource_type: "image",
              transformation: [
                { quality: "auto" },
                { fetch_format: "auto" },
              ],
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );

          stream.end(req.file.buffer);
        });
      } catch (err) {
        console.error("ABOUT IMAGE UPLOAD FAILED:", err);
        return res.status(500).json({
          message: "About image upload failed",
        });
      }

      if (about.image?.public_id) {
        await cloudinary.uploader.destroy(about.image.public_id);
      }

      about.image = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    }

    await about.save();
    return res.json({ success: true, about });
  } catch (err) {
    console.error("UPDATE ABOUT ERROR:", err);
    return res.status(500).json({
      message: "Failed to update About",
    });
  }
};
