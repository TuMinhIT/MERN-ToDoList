import ApiError from "../utils/apiError.js";
import Task from "../models/task.model.js";
const taskService = {
  createTask: async (userId, data) => {
    const task = await Task.create({
      title: data.title,
      description: data.description,
      category: data.category,
      user: userId,
    });
    return task;
  },

  getTasks: async (userId, page = 1, limit = 10, completed) => {
    const skip = (page - 1) * limit;
    const filter = {
      user: userId,
    };
    if (completed === "true" || completed === "false") {
      filter.completed = completed === "true";
    }
    const [tasks, total] = await Promise.all([
      Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Task.countDocuments(filter),
    ]);
    return {
      tasks,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  getStatistic: async (userId) => {
    const filter = { user: userId };
    const [total, completed, pending] = await Promise.all([
      Task.countDocuments(filter),
      Task.countDocuments({ ...filter, completed: true }),
      Task.countDocuments({ ...filter, completed: false }),
    ]);
    return {
      total,
      completed,
      pending,
      completionRate:
        total === 0 ? 0 : Number(((completed / total) * 100).toFixed(2)),
    };
  },

  getTasksById: async (id) => {
    const task = await Task.findById(id);
    return task;
  },

  updateTask: async (id, data, userId) => {
    const task = await Task.findById(id);
    if (!task) throw new ApiError(400, "Task not found");
    if (task.user.toString() !== userId.toString())
      throw new ApiError(403, "Not allowed");

    task.title = data.title;
    task.description = data.description;
    task.completed = data.completed ?? task.completed;
    const updated = await task.save();
    return updated;
  },

  deleteTask: async (id, userId) => {
    const task = await Task.findById(id);
    if (!task) throw new ApiError(400, "Task not found");
    if (task.user.toString() !== userId.toString())
      throw new ApiError(403, "Not allowed");
    await task.deleteOne();
    return { message: "Task deleted successfully" };
  },
};

export default taskService;
