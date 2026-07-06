import { jest } from "@jest/globals";
import Task from "../../src/models/task.model.js";
import taskService from "../../src/services/task.service.js";

describe("Task Service", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("createTask", () => {
        test("Should create task successfully", async () => {
            const mockTask = { _id: "1", title: "Test", description: "Desc", category: "Work", user: "u1" };
            jest.spyOn(Task, "create").mockResolvedValue(mockTask);
            const result = await taskService.createTask("u1", { title: "Test", description: "Desc", category: "Work" });
            expect(result).toEqual(mockTask);
            expect(Task.create).toHaveBeenCalledWith({
                title: "Test",
                description: "Desc",
                category: "Work",
                user: "u1",
            });
        });
    });

    describe("getTasks", () => {
        test("Should get tasks with pagination", async () => {
            const mockTasks = [{ _id: "1", title: "Task 1" }];
            const mockTotal = 1;
            
            jest.spyOn(Task, "find").mockReturnValue({
                sort: jest.fn().mockReturnValue({
                    skip: jest.fn().mockReturnValue({
                        limit: jest.fn().mockResolvedValue(mockTasks)
                    })
                })
            });
            jest.spyOn(Task, "countDocuments").mockResolvedValue(mockTotal);

            const result = await taskService.getTasks("u1", 1, 10, "true");
            expect(result.tasks).toEqual(mockTasks);
            expect(result.pagination.total).toBe(mockTotal);
        });
    });

    describe("getStatistic", () => {
        test("Should get statistic", async () => {
            jest.spyOn(Task, "countDocuments")
                .mockResolvedValueOnce(10) // total
                .mockResolvedValueOnce(6)  // completed
                .mockResolvedValueOnce(4); // pending
            
            const result = await taskService.getStatistic("u1");
            expect(result).toEqual({
                total: 10,
                completed: 6,
                pending: 4,
                completionRate: 60
            });
        });

        test("Should return 0 completion rate when total is 0", async () => {
            jest.spyOn(Task, "countDocuments")
                .mockResolvedValueOnce(0) // total
                .mockResolvedValueOnce(0)  // completed
                .mockResolvedValueOnce(0); // pending
            
            const result = await taskService.getStatistic("u1");
            expect(result).toEqual({
                total: 0,
                completed: 0,
                pending: 0,
                completionRate: 0
            });
        });
    });

    describe("getTasksById", () => {
        test("Should get task by id", async () => {
            const mockTask = { _id: "1", title: "Task 1" };
            jest.spyOn(Task, "findById").mockResolvedValue(mockTask);
            const result = await taskService.getTasksById("1");
            expect(result).toEqual(mockTask);
        });
    });

    describe("updateTask", () => {
        test("Should update task successfully", async () => {
            const mockTask = {
                _id: "1",
                user: "u1",
                title: "Old",
                description: "Old Desc",
                completed: false,
                save: jest.fn().mockResolvedValue(true)
            };
            jest.spyOn(Task, "findById").mockResolvedValue(mockTask);
            await taskService.updateTask("1", { title: "New", description: "New Desc", completed: true }, "u1");
            expect(mockTask.title).toBe("New");
            expect(mockTask.save).toHaveBeenCalled();
        });

        test("Should throw when task not found", async () => {
            jest.spyOn(Task, "findById").mockResolvedValue(null);
            await expect(taskService.updateTask("1", {}, "u1")).rejects.toThrow("Task not found");
        });

        test("Should throw when user not allowed", async () => {
            const mockTask = {
                _id: "1",
                user: { toString: () => "u2" },
            };
            jest.spyOn(Task, "findById").mockResolvedValue(mockTask);
            await expect(taskService.updateTask("1", {}, "u1")).rejects.toThrow("Not allowed");
        });
    });

    describe("deleteTask", () => {
        test("Should delete task successfully", async () => {
            const mockTask = {
                _id: "1",
                user: "u1",
                deleteOne: jest.fn().mockResolvedValue(true)
            };
            jest.spyOn(Task, "findById").mockResolvedValue(mockTask);
            const result = await taskService.deleteTask("1", "u1");
            expect(result.message).toBe("Task deleted successfully");
            expect(mockTask.deleteOne).toHaveBeenCalled();
        });

        test("Should throw when task not found", async () => {
            jest.spyOn(Task, "findById").mockResolvedValue(null);
            await expect(taskService.deleteTask("1", "u1")).rejects.toThrow("Task not found");
        });

        test("Should throw when user not allowed", async () => {
            const mockTask = {
                _id: "1",
                user: { toString: () => "u2" },
            };
            jest.spyOn(Task, "findById").mockResolvedValue(mockTask);
            await expect(taskService.deleteTask("1", "u1")).rejects.toThrow("Not allowed");
        });
    });
});
