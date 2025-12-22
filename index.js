import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import sensorDataRoutes from "./routes/sensor-data.js";
// import whatsappService from "./whatsapp/whatsappService.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

/* =======================
   GLOBAL MIDDLEWARE
======================= */

// ✅ CORS — SINGLE ORIGIN ONLY
app.use(
  cors({
    origin: "https://rapid-res-frontend.vercel.app",
    credentials: true,
  })
);

// ✅ Handle preflight


// ✅ Body parser (MUST be before routes)
app.use(express.json());

/* =======================
   DATABASE CONNECTION
======================= */

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

connectDB();

/* =======================
   ROUTES
======================= */

app.use("/api", authRoutes);
app.use("/api", sensorDataRoutes);

/* =======================
   HEALTH CHECK
======================= */

app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully");
});

/* =======================
   START SERVER
======================= */

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
