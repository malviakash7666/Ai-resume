import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { 
  LayoutDashboard, 
  FileText, 
  LogOut, 
  User as UserIcon, 
  UploadCloud, 
  History, 
  Sparkles,
  Search,
  Settings,
  ChevronRight
} from "lucide-react";
import { ProfilePage } from "../components/ProfilePage";

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isUploading, setIsUploading] = useState(false);

  // Mock data for previous tests
  const history = [
    { id: 1, name: "MERN_Stack_Dev.pdf", score: 85, date: "26 Feb 2026" },
    { id: 2, name: "Frontend_Resume.pdf", score: 72, date: "20 Feb 2026" },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900">
      
      {/* --- SIDEBAR --- */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
            <Sparkles size={20} />
          </div>
          <span className="font-black text-xl tracking-tight text-indigo-950">HireGen AI</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === "dashboard" ? "bg-indigo-50 text-indigo-600" : "text-slate-400 hover:bg-slate-50"
            }`}
          >
            <LayoutDashboard size={18} /> Overview
          </button>
          
          <button 
            onClick={() => setActiveTab("analyze")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === "analyze" ? "bg-indigo-50 text-indigo-600" : "text-slate-400 hover:bg-slate-50"
            }`}
          >
            <UploadCloud size={18} /> New Analysis
          </button>

          <button 
            onClick={() => setActiveTab("history")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === "history" ? "bg-indigo-50 text-indigo-600" : "text-slate-400 hover:bg-slate-50"
            }`}
          >
            <History size={18} /> Test History
          </button>

          {/* Profile Button in Nav */}
          <button 
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === "profile" ? "bg-indigo-50 text-indigo-600" : "text-slate-400 hover:bg-slate-50"
            }`}
          >
            <UserIcon size={18} /> My Profile
          </button>
        </nav>

        {/* --- USER SECTION --- */}
        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => setActiveTab("profile")}
            className="w-full flex items-center gap-3 px-2 py-3 mb-2 rounded-xl hover:bg-slate-50 transition-all group"
          >
            <div className="h-9 w-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="overflow-hidden text-left flex-1">
              <p className="text-xs font-bold truncate text-slate-800">{user?.name || "Akash Malvi"}</p>
              <p className="text-[10px] text-slate-400 truncate">View Profile</p>
            </div>
            <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-600" />
          </button>
          
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 text-[11px] font-bold text-slate-400 hover:text-red-500 transition-colors"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="font-bold text-slate-800 capitalize">{activeTab}</h2>
          
          <div className="flex items-center gap-4">
            <div className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-100 uppercase">
              AI Scoring: Live
            </div>
            {/* Quick Profile Icon in Header */}
            <button 
              onClick={() => setActiveTab("profile")}
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
              title="Profile Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Welcome Card */}
              <div className="bg-gradient-to-r from-indigo-600 to-violet-700 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <h1 className="text-3xl font-black mb-2">Analyze your Resume.</h1>
                  <p className="text-indigo-100 text-sm max-w-sm">Get instant AI feedback and improve your chances of getting hired by 3x.</p>
                  <button 
                    onClick={() => setActiveTab("analyze")}
                    className="mt-6 bg-white text-indigo-600 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all"
                  >
                    Start New Test
                  </button>
                </div>
                <Sparkles className="absolute -right-10 -top-10 text-white/10" size={200} />
              </div>

              {/* Stats & History */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <History size={18} className="text-indigo-600"/> Recent Tests
                  </h3>
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    {history.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><FileText size={16}/></div>
                          <div>
                            <p className="text-sm font-bold text-slate-700">{item.name}</p>
                            <p className="text-[10px] text-slate-400">{item.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm font-black ${item.score > 80 ? 'text-emerald-500' : 'text-orange-500'}`}>
                            {item.score}/100
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800">Your AI Insights</h3>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-indigo-50 text-indigo-600 rounded-full mb-4">
                      <Search size={24} />
                    </div>
                    <p className="text-xs text-slate-400">Average ATS Score</p>
                    <p className="text-4xl font-black text-slate-800">78.5</p>
                    <div className="mt-4 pt-4 border-t border-slate-50">
                      <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">Improving +5% this week</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analyze" && (
            <div className="max-w-2xl mx-auto py-12 animate-in zoom-in-95 duration-300">
              <div className="bg-white p-12 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center shadow-sm hover:border-indigo-400 transition-all group">
                 <div className="bg-indigo-50 p-6 rounded-full text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                    <UploadCloud size={48} />
                 </div>
                 <h2 className="text-2xl font-black text-slate-800">Upload your Resume</h2>
                 <p className="text-sm text-slate-400 mt-2 mb-8 max-w-xs">Our AI will scan your skills, experience, and keywords against industry standards.</p>
                 
                 <input type="file" id="file-upload" className="hidden" />
                 <label 
                   htmlFor="file-upload" 
                   className="cursor-pointer bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold text-sm hover:bg-black hover:shadow-xl transition-all active:scale-95"
                 >
                    Analyze File
                 </label>
                 <p className="text-[10px] text-slate-300 mt-6 font-medium">Supports PDF, DOCX (Max 5MB)</p>
              </div>
            </div>
          )}

        {activeTab === "profile" && (
  <ProfilePage /> 
)}
        </main>
      </div>
    </div>
  );
};