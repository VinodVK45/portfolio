import Footer from "../models/Footer/Footer.model.js";

export const getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne() || { message: "", email: "", socials: [] };
    res.json(footer);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch Footer" });
  }
};

export const updateFooter = async (req, res) => {
  try {
    let footer = await Footer.findOne() || new Footer();
    const { message, email, phone, adminIcon, socials } = req.body;

    footer.message = message ?? footer.message;
    footer.email = email ?? footer.email;
    footer.phone = phone ?? footer.phone;
    footer.adminIcon = adminIcon ?? footer.adminIcon;

    if (socials) {
      footer.socials = typeof socials === "string" ? JSON.parse(socials) : socials;
    }

    await footer.save();
    res.json({ success: true, footer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};