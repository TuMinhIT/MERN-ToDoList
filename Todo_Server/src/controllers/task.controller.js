import taskService from "../services/task.service.js";
import ApiResponse from "../utils/apiResponse.js";

const taskController = {
  create: async (req, res, next) => {
    const response = await taskService.createTask(req.user.userId, req.body);
    return res.json(
      new ApiResponse({
        data: response,
        message: "Task created successfully",
      }),
    );

  },

  getAll: async (req, res, next) => {
    const response = await taskService.getTasks(req.user.userId);
    return res.json(
      new ApiResponse({
        data: response,
        message: "Tasks retrieved successfully",
      }),
    );
  },

  getTasksById: async (req, res, next) => {
    const response = await taskService.getTasksById(req.params.id);
    return res.json(
      new ApiResponse({
        data: response,
        message: "Task retrieved successfully",
      }),
    );
  },

  update: async (req, res, next) => {
    const response = await taskService.updateTask(
      req.params.id,
      req.body,
      req.user.userId
    );
    return res.json(
      new ApiResponse({
        data: response,
        message: "Task updated successfully",
      }),
    );

  },

  delete: async (req, res, next) => {
    const response = await taskService.deleteTask(req.params.id, req.user.userId);
    return res.json(
      new ApiResponse({
        data: response,
        message: "Task deleted successfully",
      }),
    );

  },
};

export default taskController;
