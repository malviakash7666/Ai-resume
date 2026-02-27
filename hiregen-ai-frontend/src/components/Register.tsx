import { useState, useEffect } from "react"; // useEffect add kiya
import * as AuthService from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth"; // 👈 Context update karne ke liye

export const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useAuth(); // 👈 user check aur setUser nikaal liya

  // 🛡️ Pro-Check: Agar user pehle se login hai, toh use register page mat dikhao
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await AuthService.register(form);
      
      // 1. Context ko update karo (Backend se user object aana chahiye)
      // Note: Backend register controller mein login ki tarah user data return karein
      if (res.data?.user) {
        setUser(res.data.user);
      }

      // 2. Success Toast aur seedha Dashboard!
      toast.success("Account created! Welcome to HireGen AI 🚀");
      navigate("/dashboard");
      
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Registration failed! Try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-sans">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4 border border-gray-100"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Create Account</h2>
          <p className="text-sm text-slate-400">Join HireGen AI - Resume Analyzer</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
          <input 
            name="name" 
            placeholder="Akash Malvi" 
            className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 transition-all text-sm"
            onChange={handleChange} 
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
          <input 
            name="email" 
            type="email"
            placeholder="akash@example.com" 
            className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 transition-all text-sm"
            onChange={handleChange} 
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Password</label>
          <input 
            name="password" 
            type="password" 
            placeholder="••••••••" 
            className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 transition-all text-sm"
            onChange={handleChange} 
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`w-full py-3.5 rounded-xl font-black text-white text-sm transition-all shadow-lg ${
            loading 
              ? 'bg-indigo-300 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100 active:scale-[0.98]'
          }`}
        >
          {loading ? "Creating Account..." : "Register Now"}
        </button>

        <div className="text-center mt-6 pt-4 border-t border-slate-50">
          <p className="text-xs text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-black hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </form>
      
      <p className="text-[10px] text-slate-300 uppercase tracking-[0.2em] mt-8">
        HireGen AI • Secure Authentication
      </p>
    </div>
  );
};