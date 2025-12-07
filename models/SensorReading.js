import mongoose from "mongoose";

const sensorReadingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,   // now every reading belongs to a user
    },

    sensorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sensor",
      required: false,  // only if you have multiple sensors per user
    },

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
      required: false,
    },

    gMean: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SensorReading = mongoose.model("SensorReading", sensorReadingSchema);

export default SensorReading;
