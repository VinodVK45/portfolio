import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// ROUTES
import authRoutes from "./routes/auth.routes.js";
import aboutRoutes from "./routes/about.routes.js";
import projectRoutes from "./routes/Projects/project.routes.js";
import footerRoutes from "./routes/footer.routes.js";

// 🔐 ADMIN SEED
import createAdminIfNotExists from "./utils/createAdmin.js";

dotenv.config();

const app = express();

// ================= CONNECT DB + CREATE ADMIN =================
const startServer = async () => {
  try {
    await connectDB(); // ✅ Mongo connected
   // await createAdminIfNotExists(); // ✅ Admin created if missing

    // ================= MIDDLEWARES =================
  const allowedOrigins = [
  "http://localhost:5173",
  "https://portfolio-i6598aglo-vinod-kumars-projects-9e99b201.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);



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
