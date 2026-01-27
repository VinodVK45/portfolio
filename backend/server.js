import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// routes
import authRoutes from "./routes/auth.routes.js";
import aboutRoutes from "./routes/about.routes.js";
import projectRoutes from "./routes/Projects/project.routes.js";
import footerRoutes from "./routes/footer.routes.js";

dotenv.config();
const app = express();

/* 🔥 CONNECT DB */
connectDB();

/* ================= BODY PARSER ================= */
// ✅ ONLY JSON — DO NOT USE urlencoded with multer
app.use(express.json());

/* ================= ✅ CORS (JWT SAFE) ================= */
app.use(
  cors({
    origin: true, // allow Vercel prod + preview + localhost
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/footer", footerRoutes);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("🚀 API running OK");
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
