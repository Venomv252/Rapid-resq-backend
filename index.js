import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import sensorDataRoutes from "./routes/sensor-data.js";

// WhatsApp service
import whatsappService from "./whatsapp/whatsappService.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

/* =======================
   GLOBAL MIDDLEWARE
======================= */

// ✅ CORS — MUST be before routes
app.use(
  cors({
    origin: [
      "https://rapid-res-frontend-00.vercel.app",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);



// Body parser
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
   WHATSAPP SERVICE INIT
======================= */

// (async () => {
//   try {
//     console.log("📲 Starting WhatsApp service...");
//     await whatsappService.initialize();
//   } catch (err) {
//     console.error("❌ Error initializing WhatsApp service:", err);
//   }
// })();

/* =======================
   ROUTES
======================= */

app.use("/api", authRoutes);
app.use("/api", sensorDataRoutes);

/* =======================
   HEALTH CHECK (OPTIONAL)
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
