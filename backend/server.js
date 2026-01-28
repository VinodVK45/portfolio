import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import aboutRoutes from "./routes/about.routes.js";
import projectRoutes from "./routes/Projects/project.routes.js";
import footerRoutes from "./routes/footer.routes.js";

dotenv.config();
const app = express();

/* ================= DB ================= */
connectDB();

/* ================= BODY PARSERS (🔥 FIX) ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= CORS ================= */
app.use(cors({ origin: true }));

/* ================= HEALTH CHECK (ADD HERE) ================= */
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    db: "connected",
    cloudinary: process.env.CLOUDINARY_CLOUD_NAME,
    time: new Date(),
  });
});


/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/footer", footerRoutes);

app.get("/", (req, res) => res.send("🚀 API Running"));

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

/* ================= START ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
