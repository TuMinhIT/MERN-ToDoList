import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

import assets from "../assets/assets";
import Sidebar from "../components/Sidebar";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import DashboardPage from "../pages/DashboardPage";

const Layout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isActive, setIsActive] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b py-3 border-gray-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 ">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                to="#"
                className="flex items-center justify-center space-x-2 h-20 overflow-hidden"
              >
                <img src={assets.logo} alt="Logo" className=" w-45 h-auto" />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <>
                  <span className="text-gray-600 text-sm">
                    Xin chào, <strong>{user.name}</strong>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Đăng Xuất
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
        `}
        >
          <Sidebar
            setIsOpen={setIsOpen}
            isActive={isActive}
            setIsActive={setIsActive}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Nút toggle chỉ hiện trên mobile */}
          <button
            className="md:hidden mb-4 p-2 rounded bg-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            <IoMdMenu />
          </button>

          <DashboardPage isActive={isActive} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
