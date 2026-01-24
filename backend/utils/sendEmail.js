import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, text }) => {
  try {
    await resend.emails.send({
      from: "Admin Panel <onboarding@resend.dev>",
      to,
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
