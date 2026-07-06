import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import assets from "../assets/assets";
import { useMutation } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import userService from "../services/userService";
import { IoIosHome } from "react-icons/io";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const _service = userService()

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  const loginMutate = useMutation({
    mutationFn: _service.login,

    onSuccess: (res) => {
      login(res.data.user, res.data.accessToken);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log(err.response.data.message);
      toast.error("Sai email hoặc mật khẩu!");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginMutate.mutate({ email, password });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage: `url('${assets.bg_2}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {loginMutate.isPending && <Spinner />}
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-2xl">
        <div className="absolute ">
          <Link to="/">
            <IoIosHome className="w-5 h-5 hover:text-amber-300" />
          </Link>
        </div>
        <div className="text-center">
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 mb-6 h-20 overflow-hidden"
          >
            <img src={assets.logo} alt="Logo" className=" w-45 h-auto" />
          </Link>

          <h2 className="text-3xl font-extrabold text-gray-900">Đăng Nhập</h2>
          <p className="mt-2 text-sm text-gray-600">
            Chào mừng bạn quay trở lại
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Đăng Nhập
            </button>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Đăng ký ngay
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
