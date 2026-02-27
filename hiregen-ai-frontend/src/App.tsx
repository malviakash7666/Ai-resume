import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/Authcontext";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Dashboard } from "./pages/DashboardPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify"; // 👈 Import Container
import "react-toastify/dist/ReactToastify.css"; // 👈 Import CSS

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* 🍞 Toastify Container setup */}
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
          theme="colored"
        />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;