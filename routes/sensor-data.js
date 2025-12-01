import express from "express";
import SensorReading from "../models/SensorReading.js";

const Sensordata_route = express.Router();

Sensordata_route.post("/sensor-data", async (req, res) => {
  try {
    const { longitude, latitude, altitude, gMean } = req.body;

    const reading = await SensorReading.create({
      longitude,
      latitude,
      altitude,
      gMean,
    });

    res.status(201).json({
      message: "Sensor data saved",
      data: reading,
    });
  } catch (err) {
    console.error("Error saving sensor data:", err);
    res.status(500).json({ message: "Error saving sensor data" });
  }
});

export default Sensordata_route;
