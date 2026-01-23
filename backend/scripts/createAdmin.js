import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/Admin/Admin.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Admin.deleteMany({}); // optional: clean old admins

const admin = await Admin.create({
  email: "admin@gmail.com",
  password: "admin123",
});

console.log("✅ Admin created:", admin.email);

process.exit();
