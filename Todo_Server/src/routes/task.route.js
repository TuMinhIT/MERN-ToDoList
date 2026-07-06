import express from "express";
import { checkAccessToken } from "../middlewares/auth.middleware.js";
import taskController from "../controllers/task.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createSchema, updateSchema } from "../schemas/task.schema.js";
import validate from "../middlewares/validate.middleware.js";

const router = express.Router();

// getall
router.get("/", checkAccessToken, asyncHandler(taskController.getAll));

router.get(
  "/statistic",
  checkAccessToken,
  asyncHandler(taskController.getStatistic),
);

// getbyid
router.get("/:id", checkAccessToken, asyncHandler(taskController.getTasksById));

// add new
router.post(
  "/",
  validate(createSchema),
  checkAccessToken,
  asyncHandler(taskController.create),
);

// update task
router.put(
  "/:id",
  validate(updateSchema),
  checkAccessToken,
  asyncHandler(taskController.update),
);

// Delete task
router.delete("/:id", checkAccessToken, asyncHandler(taskController.delete));

export default router;
