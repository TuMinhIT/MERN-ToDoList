// routes/user.route.js
import express from "express";
import userController from "../controllers/user.controller.js";
import validate from "../middlewares/validate.middleware.js";
import {
  registerSchema,
  loginSchema,
} from "../schemas/user.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import { checkAccessToken, checkRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(userController.register),
);

router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(userController.login),
);

router.get("/",
  checkAccessToken,
  checkRole(["admin"]),
  asyncHandler(userController.getAll)
);


export default router;
