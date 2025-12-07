import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import sensorDataRoutes from "./routes/sensor-data.js";
import whatsappService from "./whatsappService.js";   // ⭐ ADD THIS

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// --------------------- MIDDLEWARE ---------------------
app.use(
  cors({
    origin: [
      "https://rapid-res-frontend-00.vercel.app",
      "http://localhost:3000",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());


// --------------------- DATABASE CONNECTION ---------------------
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
};

connectDB();


// --------------------- WHATSAPP SERVICE INIT ---------------------
(async () => {
  console.log("📲 Starting WhatsApp service...");
  await whatsappService.initialize();   // ⭐ IMPORTANT
})();


// --------------------- ROUTES ---------------------
app.use("/api", authRoutes);
app.use("/api", sensorDataRoutes);


// --------------------- START SERVER ---------------------
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
