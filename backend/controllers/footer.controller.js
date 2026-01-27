import Footer from "../models/Footer/Footer.model.js";

/* ================= GET FOOTER ================= */
export const getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();

    // ✅ safe fallback, NO DB write
    if (!footer) {
      return res.status(200).json({
        message: "",
        email: "",
        phone: "",
        adminIcon: "Shield",
        socials: [],
      });
    }

    return res.json(footer);
  } catch (err) {
    console.error("GET FOOTER ERROR:", err);
    return res.status(500).json({ message: "Failed to fetch Footer" });
  }
};


/* ================= UPDATE FOOTER ================= */
export const updateFooter = async (req, res) => {
  try {
    const {
      message,
      email,
      phone,
      adminIcon,
      socials,
    } = req.body;

    let footer = await Footer.findOne();
    if (!footer) footer = new Footer();

    /* ✅ SAFE SOCIALS HANDLING */
    let parsedSocials = [];

    if (Array.isArray(socials)) {
      parsedSocials = socials;
    } else if (typeof socials === "string") {
      try {
        parsedSocials = JSON.parse(socials);
      } catch {
        parsedSocials = [];
      }
    }

    footer.message = message;
    footer.email = email;
    footer.phone = phone;
    footer.adminIcon = adminIcon || "Shield";
    footer.socials = parsedSocials;

    await footer.save();

    res.json({ success: true, footer });
  } catch (err) {
    console.error("UPDATE FOOTER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
