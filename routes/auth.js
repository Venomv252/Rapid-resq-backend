import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

/* =======================
   PREFLIGHT HANDLER (CRITICAL)
======================= */

// ✅ THIS FIXES CORS PERMANENTLY
router.options("*", (req, res) => {
  res.sendStatus(200);
});

/* =======================
   SIGNUP
======================= */

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    // Validate input fields
    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check if phone number already exists
    const phoneExist = await User.findOne({ phoneNumber });
    if (phoneExist) {
      return res.status(400).json({ message: "Phone number already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await newUser.save();

    return res.status(200).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
      },
    });
  } catch (e) {
    return res.status(500).json({
      message: "Error saving user",
      error: e.message,
    });
  }
});

/* =======================
   LOGIN
======================= */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (e) {
    return res.status(500).json({
      message: "Login error",
      error: e.message,
    });
  }
});

export default router;
