import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Private from "./router/Private";
import Public from "./router/Public";
// Import pages
import HomePage from "./pages/HomePage";

import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route
            path="/"
            element={
              <Public>
                <HomePage />
              </Public>
            }
          />
          <Route
            path="/login"
            element={
              <Public>
                <LoginPage />
              </Public>
            }
          />
          <Route
            path="/register"
            element={
              <Public>
                <RegisterPage />
              </Public>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Private>
                <Layout />
              </Private>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
