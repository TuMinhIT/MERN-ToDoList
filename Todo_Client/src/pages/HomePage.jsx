import assets from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import FooterContact from "../components/FooterContact";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";

const HomePage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center ">
              <Link
                to="/dashboard"
                className="flex items-center justify-center h-20 overflow-hidden"
              >
                <img src={assets.logo} alt="Logo" className=" w-30 " />
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Đăng Nhập
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Đăng Ký
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}

      <div
        className=" flex items-center justify-center p-10"
        style={{
          backgroundImage: `url('${assets.bg_3}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Todos, <span className="text-blue-600">just tasks</span>
          </h1>
          <p className="text-xl text-black mb-8 max-w-2xl mx-auto">
            Theo dõi các công việc hàng ngày trong cuộc sống và cảm nhận sự hài
            lòng khi hoàn thành chúng.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                Bắt Đầu Ngay
              </button>
            </Link>
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200">
              Tìm Hiểu Thêm
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white pt-16  pb-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Tại sao chọn Todos?
            </h2>
            <p className="text-lg text-gray-600">
              Những lợi ích tuyệt vời của việc sử dụng danh sách công việc
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tăng Năng Suất
              </h3>
              <p className="text-gray-600">
                Tổ chức công việc hiệu quả và hoàn thành nhiều hơn trong thời
                gian ngắn hơn
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Cải Thiện Trí Nhớ
              </h3>
              <p className="text-gray-600">
                Ghi nhớ mọi công việc quan trọng và không bao giờ quên những gì
                cần làm
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Cảm Giác Hài Lòng
              </h3>
              <p className="text-gray-600">
                Trải nghiệm niềm vui khi hoàn thành công việc và đạt được mục
                tiêu
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterContact />
    </div>
  );
};

export default HomePage;
