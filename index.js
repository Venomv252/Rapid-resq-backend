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
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = "https://rapid-res-frontend.vercel.app";
      
      // if (allowedOrigins.indexOf(origin) !== -1) {
      //   callback(null, true);
      // } else {
      //   console.log(`CORS blocked origin: ${origin}`);
      //   callback(new Error('Not allowed by CORS'));
      // }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    // optionsSuccessStatus: 200
  })
);

// Additional CORS headers for preflight requests
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    "https://rapid-res-frontend-00.vercel.app",
    "https://rapid-res-frontend.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
  ];
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});




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
