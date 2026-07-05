import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const userService = {
  createUser: async (name, email, password) => {
    const existing = await User.findOne({ email });
    const role = "user";
    if (existing) {
      throw new ApiError(400, "Email already exists", "Bad Request");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return user.name;
  },

  login: async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(400, "User not found");
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(400, "incorect password");
    }

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "90m" },
    );

    return {
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        avatar: user.avatar && "",
      },

    }
  },

  getUserById: async (id) => {
    return await User.findById(id).select("-password");
  },

  getUserByEmail: async (email) => {
    return await User.findOne({ email });
  },

  getAllUsers: async () => {
    return await User.find({ role: { $ne: "admin" } });
  },


};

export default userService;
