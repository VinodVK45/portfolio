import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

/* ================= SEND EMAIL ================= */
const sendEmail = async ({ to, subject, html }) => {
  if (!resend) {
    console.warn("⚠️ RESEND_API_KEY missing. Email not sent.");
    return false;
  }

  try {
    const response = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // sandbox sender
      to: [to],
      subject,
      html, // ✅ MUST BE HTML
    });

    console.log("📧 Email sent successfully:", response);
    return true;
  } catch (error) {
    console.error("❌ EMAIL SEND FAILED:", error);
    return false;
  }
};

export default sendEmail;
