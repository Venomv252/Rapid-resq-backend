import mongoose from "mongoose";

const sensorReadingSchema = new mongoose.Schema(
  {
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    altitude: {
      type: Number,
      required: false, // in meters (you can make it true if you always have it)
    },
    gMean: {
      type: Number,
      required: true, // mean g-force from accelerometer
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

const SensorReading = mongoose.model("SensorReading", sensorReadingSchema);

export default SensorReading;
