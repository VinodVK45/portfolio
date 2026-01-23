import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, text }) => {
  await resend.emails.send({
    from: "Admin Panel <onboarding@resend.dev>", // Resend default sender
    to,
    subject,
    text,
  });
};

export default sendEmail;
