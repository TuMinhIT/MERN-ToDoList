import mongoose from "mongoose";
import { MONGO_URL } from "./constants.js";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {});
    console.log(" MongoDB connected successfully.");
  } catch (err) {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
