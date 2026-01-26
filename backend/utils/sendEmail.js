import { Resend } from "resend";

let resend = null;

/* ================= INIT RESEND ================= */
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
} else {
  console.warn("⚠️ RESEND_API_KEY not set. Emails disabled.");
}

/* ================= SEND EMAIL ================= */
const sendEmail = async ({ to, subject, html }) => {
  // ⛔ Prevent crash if API key missing
  if (!resend) {
    console.warn("📭 Email skipped (Resend not configured)");
    return false;
  }

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // ✅ REQUIRED
      to: [to],
      subject,
      html, // ✅ USE HTML (IMPORTANT)
    });

    console.log("📧 Email sent to:", to);
    return true;
  } catch (error) {
    console.error("❌ EMAIL ERROR:", error);
    return false;
  }
};

export default sendEmail;
