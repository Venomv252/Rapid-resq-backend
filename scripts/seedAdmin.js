import bcrypt from "bcrypt";
import express from "express";
import mongoose from "mongoose";
import Admin from "../models/admin.js";
import dotenv from "dotenv";
import connectDB from "../config/db.js";

dotenv.config();

const CreateAdmin = async () => {
  try {
    connectDB();
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await Admin.create({
      name: "Admin",
      email: "hrsht02@gmail.com",
      password: hashedPassword,
    });

    console.log("Admin seeded Successfully");
    process.exit(1);
  } catch (error) {
    console.error("Seeding failed", error);
    process.exit(1);
  }
};


CreateAdmin();

