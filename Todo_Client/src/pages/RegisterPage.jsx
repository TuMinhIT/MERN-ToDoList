import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import assets from "../assets/assets";
import { useMutation } from "@tanstack/react-query";
import userService from "../services/userService";
import Spinner from "../components/Spinner";
import { IoIosHome } from "react-icons/io";

const RegisterPage = () => {

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const _service = userService();

  const register = useMutation({
    mutationFn: _service.register,
    onSuccess: (res) => {
      toast.success("Đăng ký thành công! Mời bạn đăng nhập.");
      setIsRegistered(true);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Đăng ký thất bại!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    if (password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    register.mutate({ userName, email, password });
  };

  if (isRegistered) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage: `url('${assets.bg_3}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {register.isPending && <Spinner />}

      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-2xl">
        <div className="absolute">
          <Link to="/">
            <IoIosHome className="w-5 h-5 hover:text-amber-300" />
          </Link>
        </div>
        <div className="text-center">
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 mb-6 h-20 overflow-hidden"
          >
            <img src={assets.logo} alt="Logo" className="w-50" />
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900">Đăng Ký</h2>
          <p className="mt-2 text-sm text-gray-600">
            Tạo tài khoản mới để bắt đầu
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">

            <input
              id="userName"
              name="username"
              type="name"
              required
              placeholder="Tên người dùng"
              className="relative block w-full px-3 py-3 border focus:outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 sm:text-sm"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Địa chỉ email"
              className="relative block w-full focus:outline-none px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Mật khẩu (ít nhất 6 ký tự)"
              className="relative block w-full px-3 py-3  focus:outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="Xác nhận mật khẩu"
              className="relative block w-full px-3 py-3 focus:outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 sm:text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
          >
            Đăng Ký
          </button>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="font-medium text-green-600 hover:text-green-500 transition-colors"
              >
                Đăng nhập
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
