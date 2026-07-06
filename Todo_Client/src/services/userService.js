import API from "./api";

const userService = () => {
  const resource = "/api/users";

  const login = async ({ email, password }) => {
    try {
      const response = await API.post(resource + "/login", {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  const register = async ({ userName, email, password }) => {
    try {
      const response = await API.post(resource + "/register", {
        name: userName,
        email: email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  return {
    login, register
  };
};
export default userService;
