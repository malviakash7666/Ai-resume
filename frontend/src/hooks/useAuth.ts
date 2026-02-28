import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import * as AuthService from "../services/auth.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  // Login: Error seedha caller (Login.tsx) handle karega
  const login = async (data: { email: string; password: string }) => {
    const res = await AuthService.login(data);
    context.setUser(res.data.user);
    return res;
  };

  // Logout: Isko simple rakhte hain
  const logout = async () => {
    await AuthService.logout();
    context.setUser(null);
    toast.info("Logged out successfully 👋");
    navigate("/login");
  };

  return { ...context, login, logout };
};