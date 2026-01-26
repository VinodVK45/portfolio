import { Resend } from "resend";

let resend = null;

// ✅ Initialize ONLY if API key exists
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
} else {
  console.warn("⚠️ RESEND_API_KEY not set. Emails are disabled.");
}

const sendEmail = async ({ to, subject, text }) => {
  // ✅ Prevent crash if email disabled
  if (!resend) {
    console.warn("📭 Email skipped (Resend not configured)");
    return false;
  }

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [to],
      subject,
      text,
    });

    return true;
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return false;
  }
};

export default sendEmail;
