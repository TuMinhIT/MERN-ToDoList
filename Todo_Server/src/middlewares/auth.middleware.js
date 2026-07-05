import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";
import { JWT_SECRET } from "../config/constants.js";
export const checkAccessToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return next(new ApiError(401, "Missing or invalid Authorization header"));
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(new ApiError(401, "Missing access token"));
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;
    next()
  } catch (err) {
    return next(new ApiError(401, "Token error"));
  }
};

export const checkRole = (roles = []) => {

  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "You don't have permission"));
    }
    next();
  };

};
