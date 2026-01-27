import About from "../models/About/About.model.js";
import cloudinary, { uploadToCloudinary } from "../config/cloudinary.js";

/* ================= GET ABOUT ================= */
export const getAbout = async (req, res) => {
  const about = await About.findOne();
  return res.json(
    about || {
      subtitle: "About Me",
      paragraph1: "",
      paragraph2: "",
      paragraph3: "",
      highlightText: "",
      services: [],
      location: "",
      image: null,
    }
  );
};

/* ================= UPDATE ABOUT ================= */
export const updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) about = new About();

    about.subtitle = req.body.subtitle;
    about.paragraph1 = req.body.paragraph1;
    about.paragraph2 = req.body.paragraph2;
    about.paragraph3 = req.body.paragraph3;
    about.highlightText = req.body.highlightText;
    about.location = req.body.location;

    if (req.body.services) {
      about.services = Array.isArray(req.body.services)
        ? req.body.services
        : JSON.parse(req.body.services);
    }

    if (req.file && req.file.buffer) {
      let uploadResult;
      try {
        uploadResult = await uploadToCloudinary(
          req.file.buffer,
          "portfolio/about"
        );
      } catch (err) {
        console.error("ABOUT IMAGE ERROR:", err);
        return res.status(500).json({ message: "Image upload failed" });
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
    return res.status(500).json({ message: "Failed to update About" });
  }
};
