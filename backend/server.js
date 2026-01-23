import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// ROUTES
import authRoutes from "./routes/auth.routes.js";
import aboutRoutes from "./routes/about.routes.js";
import projectRoutes from "./routes/Projects/project.routes.js";
import footerRoutes from "./routes/footer.routes.js";

dotenv.config();

const app = express();

// ================= START SERVER =================
const startServer = async () => {
  try {
    await connectDB(); // ✅ Mongo connected

    // ================= CORS (FINAL FIX) =================
    app.use(
      cors({
        origin: true, // 🔥 allow all origins (Vercel, localhost, preview)
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: [
          "Content-Type",
          "Authorization",
          "X-Requested-With",
        ],
      })
    );

    // 🔥 HANDLE PREFLIGHT (VERY IMPORTANT)
    app.options("*", cors());

    // ================= BODY PARSERS =================
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    // ================= ROUTES =================
    app.use("/api/auth", authRoutes);
    app.use("/api/about", aboutRoutes);
    app.use("/api/projects", projectRoutes);
    app.use("/api/footer", footerRoutes);

    // ================= HEALTH CHECK =================
    app.get("/", (req, res) => {
      res.send("API is running...");
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
