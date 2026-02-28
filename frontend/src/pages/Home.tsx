import { useNavigate } from "react-router-dom";
import { Sparkles, FileText, ArrowRight, ShieldCheck, Zap } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900">
      {/* --- NAVBAR --- */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-100">
            <Sparkles size={22} />
          </div>
          <span className="font-black text-2xl tracking-tight text-slate-900">HireGen AI</span>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate("/login")}
            className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate("/register")}
            className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-black shadow-xl transition-all active:scale-95"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="max-w-5xl mx-auto px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full mb-8 animate-bounce">
          <Zap size={14} fill="currentColor" />
          <span className="text-[10px] font-black uppercase tracking-widest">Next-Gen Resume Analysis</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-black text-slate-950 leading-[1.1] mb-8">
          Your Resume deserves <br />
          <span className="text-indigo-600 italic">Better Scoring.</span>
        </h1>

        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          HireGen AI uses advanced algorithms to scan your resume against 
          industry standards. Get hired faster by fixing your ATS score today.
        </p>

        {/* MAIN BUTTON */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate("/dashboard")}
            className="group flex items-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-2xl shadow-indigo-200 transition-all hover:-translate-y-1"
          >
            Analyze My Resume
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* FEATURES STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 border-t border-slate-100 pt-16">
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-slate-800">ATS Compatible</h3>
            <p className="text-xs text-slate-400">Pass through top Applicant Tracking Systems easily.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <FileText size={24} />
            </div>
            <h3 className="font-bold text-slate-800">Keyword Analysis</h3>
            <p className="text-xs text-slate-400">Identify missing skills that recruiters are looking for.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
              <Zap size={24} />
            </div>
            <h3 className="font-bold text-slate-800">Instant Score</h3>
            <p className="text-xs text-slate-400">Get your result in under 10 seconds with AI.</p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center py-10 text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
        © 2026 HireGen AI • Built for Professionals
      </footer>
    </div>
  );
};

export default Home;