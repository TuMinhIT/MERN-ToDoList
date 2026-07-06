import { Navigate } from "react-router-dom";

export default function Public({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    // Nếu đã đăng nhập thì redirect về dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
