import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // 1️⃣ Validate email
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // 2️⃣ Allow only admin email
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(404).json({
        message: "Admin email not found",
      });
    }

    // 3️⃣ Create reset token
    const resetToken = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // 4️⃣ Reset link
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // 5️⃣ Send email
    const emailSent = await sendEmail({
      to: email,
      subject: "Reset Your Admin Password",
      text: `Click the link below to reset your password:\n\n${resetLink}\n\nThis link expires in 15 minutes.`,
    });

    // 6️⃣ If email failed → STOP
    if (!emailSent) {
      return res.status(500).json({
        message: "Failed to send reset email. Try again later.",
      });
    }

    // 7️⃣ Success
    res.json({
      message: "Password reset link sent to your email",
    });

  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
