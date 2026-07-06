import { jest } from "@jest/globals";
import User from "../../src/models/user.model.js";
import userService from "../../src/services/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

describe("User Service", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("createUser", () => {
        test("Should create user successfully", async () => {
            jest.spyOn(User, "findOne").mockResolvedValue(null);
            jest.spyOn(User, "create").mockResolvedValue({
                _id: "1",
                name: "Tu",
                email: "tu@gmail.com",
                role: "user"
            });
            jest.spyOn(bcrypt, "hash").mockResolvedValue("hashedPassword");

            const result = await userService.createUser("Tu", "tu@gmail.com", "123456");

            expect(result).toBe("Tu");
            expect(User.create).toHaveBeenCalledWith({
                name: "Tu",
                email: "tu@gmail.com",
                password: "hashedPassword",
                role: "user"
            });
        });

        test("Should throw when email already exists", async () => {
            jest.spyOn(User, "findOne").mockResolvedValue({ email: "abc@gmail.com" });

            await expect(userService.createUser("Tu", "abc@gmail.com", "123456"))
                .rejects.toThrow("Email already exists");
        });
    });

    describe("login", () => {
        test("Should login successfully", async () => {
            const mockUser = {
                _id: "1",
                email: "tu@gmail.com",
                password: "hashedPassword",
                role: "user",
                name: "Tu"
            };
            jest.spyOn(User, "findOne").mockResolvedValue(mockUser);
            jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
            jest.spyOn(jwt, "sign").mockReturnValue("mockAccessToken");
            process.env.JWT_SECRET = "secret";

            const result = await userService.login("tu@gmail.com", "123456");

            expect(result.accessToken).toBe("mockAccessToken");
            expect(result.user.email).toBe("tu@gmail.com");
        });

        test("Should throw when user not found", async () => {
            jest.spyOn(User, "findOne").mockResolvedValue(null);
            await expect(userService.login("tu@gmail.com", "123456"))
                .rejects.toThrow("User not found");
        });

        test("Should throw when password incorrect", async () => {
            jest.spyOn(User, "findOne").mockResolvedValue({ password: "hashed" });
            jest.spyOn(bcrypt, "compare").mockResolvedValue(false);
            await expect(userService.login("tu@gmail.com", "wrong"))
                .rejects.toThrow("incorect password");
        });
    });

    describe("getUserById", () => {
        test("Should get user by id", async () => {
            const mockUser = { _id: "1", name: "Tu" };
            jest.spyOn(User, "findById").mockReturnValue({
                select: jest.fn().mockResolvedValue(mockUser)
            });
            const result = await userService.getUserById("1");
            expect(result).toEqual(mockUser);
        });
    });

    describe("getUserByEmail", () => {
        test("Should get user by email", async () => {
            const mockUser = { _id: "1", email: "tu@gmail.com" };
            jest.spyOn(User, "findOne").mockResolvedValue(mockUser);
            const result = await userService.getUserByEmail("tu@gmail.com");
            expect(result).toEqual(mockUser);
        });
    });

    describe("getAllUsers", () => {
        test("Should get all users", async () => {
            const mockUsers = [{ _id: "1", name: "Tu" }];
            jest.spyOn(User, "find").mockResolvedValue(mockUsers);
            const result = await userService.getAllUsers();
            expect(result).toEqual(mockUsers);
        });
    });
});
