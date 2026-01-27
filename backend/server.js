import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import aboutRoutes from "./routes/about.routes.js";
import projectRoutes from "./routes/Projects/project.routes.js";
import footerRoutes from "./routes/footer.routes.js"; // IMPORT THIS

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cors({ origin: true }));

// ✅ REGISTER ALL ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/footer", footerRoutes); // FIXES THE 404 ERROR

app.get("/", (req, res) => res.send("🚀 API Running"));

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Port: ${PORT}`));