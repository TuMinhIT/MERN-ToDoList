
import ApiError from "../utils/apiError.js";
import Task from "../models/task.model.js";
const taskService = {
  createTask: async (userId, data) => {
    console.log(userId)
    const task = await Task.create({
      title: data.title,
      desc: data.description,
      category: data.category,
      user: userId,
    });
    return task;
  },

  getTasks: async (userId) => {
    const tasks = await Task.find({ user: userId });
    return tasks;
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

