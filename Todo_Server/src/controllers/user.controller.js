import userService from "../services/user.service.js";
import ApiResponse from "../utils/apiResponse.js";

const userController = {
  register: async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await userService.createUser(name, email, password);
    res.json(
      new ApiResponse({
        message: "User created successfully",
        data: { user },
      }),
    );
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const result = await userService.login(email, password);

      return res.json(
        new ApiResponse({
          message: "login success",
          data: result,
        }),
      );
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req, res, next) => {
    const users = await userService.getAllUsers();
    return res.json(
      new ApiResponse({
        success: true,
        data: users,
        message: "Users fetched",
      }),
    );
  },

};

export default userController;
