import Admin from "../models/Admin/Admin.model.js";

const createAdminIfNotExists = async () => {
  const adminExists = await Admin.findOne({
    email: process.env.ADMIN_EMAIL,
  });

  if (adminExists) {
    console.log("ℹ️ Admin already exists");
    return;
  }

  await Admin.create({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD, // 🔐 auto-hashed by schema
  });

  console.log("✅ Admin account created");
};

export default createAdminIfNotExists;
