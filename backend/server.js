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

/* ================= BODY PARSERS ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= CORS (FIXED FOR VERCEL) ================= */
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://portfolio-899jnz1m-vinod-kumars-projects-9e99b201.vercel.app",
  "https://portfolio-git-main-vinod-kumars-projects-9e99b201.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman / curl / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// IMPORTANT: preflight
app.options("*", cors());

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/footer", footerRoutes);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("API running OK");
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
