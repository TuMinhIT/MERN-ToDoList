import { Link } from "react-router-dom";
import { SiGoogletasks } from "react-icons/si";
import { GrTask } from "react-icons/gr";
import { CiTimer } from "react-icons/ci";
const Sidebar = ({ setIsOpen, isActive, setIsActive }) => {
  return (
    <>
      <div className="w-64 relative bg-white shadow-sm min-h-screen">
        <p
          onClick={() => setIsOpen(false)}
          className="absolute md:hidden hover:text-red-500 right-5 top-3 cursor-pointer"
        >
          x
        </p>
        <div className="p-6 ">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 uppercase tracking-wide">
            Bộ Sưu Tập
          </h2>

          <nav className="space-y-2">
            <div
              // to="/dashboard"
              onClick={() => {
                setIsActive(false);
                setIsOpen(false);
              }}
              className={`flex gap-2 cursor-pointer items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive == false
                ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              <CiTimer />
              Công Việc Đang Chờ
            </div>
            <div
              // to="/completed"
              onClick={() => {
                setIsOpen(false);
                setIsActive(true);
              }}
              className={`flex items-center cursor-pointer gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive == true
                ? "bg-green-100 text-green-700 border-r-2 border-green-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              <SiGoogletasks />
              Công Việc Hoàn Thành
            </div>
            <div
              onClick={() => {
                setIsActive(undefined);
                setIsOpen(false);
              }}
              className={`flex gap-2 cursor-pointer items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive == undefined
                ? "bg-purple-100 text-purple-700 border-r-2 border-purple-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              <GrTask />
              Tất Cả Công Việc
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
