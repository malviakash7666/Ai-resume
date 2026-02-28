import type { ReactNode } from "react";
import  { createContext, useState, useEffect } from 'react';

import API from '../api/api'; 

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 🔍 Backend se session check kar rahe hain
        const res = await API.get("/auth/me"); 
        
        // Backend agar { authenticated: true, user: {...} } bhej raha hai
        if (res.data.authenticated || res.data.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth initialization failed:", err);
        setUser(null);
      } finally {
        // ✅ Check khatam, ab app render ho sakti hai
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {/* ✋ Loading ke waqt screen white ya spinner dikhega, 
          taki redirect ka jhatka na lage */}
      {!loading ? (
        children
      ) : (
        <div className="h-screen flex items-center justify-center bg-gray-50 font-sans">
          <div className="flex flex-col items-center gap-3">
             <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-xs font-bold text-gray-400">Verifying Session...</p>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};