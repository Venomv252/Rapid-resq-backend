import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/adminauth.js";
import sensorDataRoutes from "./routes/sensor-data.js";
import connectDB from "./config/db.js";
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
    origin: "http://localhost:5137",
    credentials: true,
  })
);

// ✅ Handle preflight


// ✅ Body parser (MUST be before routes)
app.use(express.json());

/* =======================
   DATABASE CONNECTION
======================= */



connectDB();

/* =======================
   ROUTES
======================= */

app.use("/api", authRoutes);
app.use("/api",adminRoutes);
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
