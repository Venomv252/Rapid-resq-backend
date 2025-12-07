import express from "express";
import SensorReading from "../models/SensorReading.js";
import User from "../models/User.js";
import whatsappService from "../whatsapp/whatsappService.js";   // ✅ FIXED PATH

const Sensordata_route = express.Router();

Sensordata_route.post("/sensor-data", async (req, res) => {
  try {
    const { userId, longitude, latitude, altitude, gMean } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // Fetch user to check threshold + phone number
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Save reading in DB
    const reading = await SensorReading.create({
      userId,
      longitude,
      latitude,
      altitude,
      gMean,
    });

    // Check threshold
    let alertSent = false;

    if (gMean > user.threshold) {
      const message = `⚠️ ALERT FROM YOUR SENSOR
Threshold Crossed!
Value: ${gMean}
Location: ${latitude}, ${longitude}`;

      try {
        await whatsappService.sendMessage(user.phoneNumber, message);
        alertSent = true;
        console.log("WhatsApp alert sent to", user.phoneNumber);
      } catch (err) {
        console.error("Error sending WhatsApp alert:", err);
      }
    }

    // Response
    res.status(201).json({
      message: "Sensor data saved",
      alertSent,
      data: reading,
    });

    console.log("Saved Sensor Data:", reading);

  } catch (err) {
    console.error("Error saving sensor data:", err);
    res.status(500).json({ message: "Server error while saving sensor data" });
  }
});

export default Sensordata_route;
