import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type: String,
        required: true,   // Needed for WhatsApp alerts
    },

    threshold: {
        type: Number,
        default: 10,      // Default threshold if users don’t set it
    },

    sensors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sensor",  // If you create a Sensor model
        }
    ],

}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;
