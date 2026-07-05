// models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String, required: false },
    is_active: { type: Boolean, default: true },
    avatar: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" }
  },
  {
    collection: "users",
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
