import About from "../models/About/About.model.js";
import cloudinary from "../config/cloudinary.js";

/* ================= GET ABOUT ================= */
export const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    if (!about) {
      about = await About.create({
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

    res.json(about);
  } catch (err) {
    console.error("GET ABOUT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
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

    let parsedServices = [];

    if (Array.isArray(services)) {
      parsedServices = services;
    } else if (typeof services === "string") {
      try {
        parsedServices = JSON.parse(services);
      } catch {
        parsedServices = services.split(",").map(s => s.trim()).filter(Boolean);
      }
    }

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

    if (req.file) {
      if (about.image?.public_id) {
        await cloudinary.uploader.destroy(about.image.public_id);
      }

      cloudinary.uploader.upload_stream(
  {
    folder: "portfolio/about",

    // 🔥 OPTIMIZE LARGE IMAGES
    resource_type: "image",
    transformation: [
      { quality: "auto" },        // auto compress
      { fetch_format: "auto" },   // webp/avif when possible
    ],
  },
  async (error, result) => {
    if (error) {
      console.error("CLOUDINARY ERROR:", error);
      return res.status(500).json({ message: "Image upload failed" });
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
