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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const completed = req.query.completed;
    const result = await taskService.getTasks(
      req.user.userId,
      page,
      limit,
      completed,
    );
    console.log("retrieve");

    return res.json(
      new ApiResponse({
        data: result,
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

  getStatistic: async (req, res, next) => {
    const response = await taskService.getStatistic(req.user.userId);
    return res.json(
      new ApiResponse({
        data: response,
        message: "Statistic retrieved successfully",
      }),
    );
  },

  update: async (req, res, next) => {
    const response = await taskService.updateTask(
      req.params.id,
      req.body,
      req.user.userId,
    );
    return res.json(
      new ApiResponse({
        data: response,
        message: "Task updated successfully",
      }),
    );
  },

  delete: async (req, res, next) => {
    const response = await taskService.deleteTask(
      req.params.id,
      req.user.userId,
    );
    return res.json(
      new ApiResponse({
        data: response,
        message: "Task deleted successfully",
      }),
    );
  },
};

export default taskController;
