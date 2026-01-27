import Footer from "../models/Footer/Footer.model.js";

/* ================= GET FOOTER ================= */
export const getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();

    // ✅ If no footer in DB, return a valid object structure
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
    const { message, email, phone, adminIcon, socials } = req.body;

    let footer = await Footer.findOne();
    if (!footer) footer = new Footer();

    // ✅ Update basic fields
    footer.message = message !== undefined ? message : footer.message;
    footer.email = email !== undefined ? email : footer.email;
    footer.phone = phone !== undefined ? phone : footer.phone;
    footer.adminIcon = adminIcon || footer.adminIcon;

    // ✅ Safe Socials Handling
    if (socials) {
      try {
        footer.socials = typeof socials === "string" ? JSON.parse(socials) : socials;
      } catch (e) {
        console.error("Socials parsing error:", e);
      }
    }

    await footer.save();
    res.json({ success: true, footer });
  } catch (err) {
    console.error("UPDATE FOOTER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};