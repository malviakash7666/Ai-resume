import { useState, useEffect } from "react";
import { 
  User, Save, Loader2, MapPin, Briefcase, 
  Github, Linkedin, Phone, GraduationCap, 
  Edit3, X, AlignLeft 
} from "lucide-react";
import ProfileService from "../services/profile.service";

export const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    phone: "",
    githubUrl: "",
    linkedinUrl: "",
    skills: "",
    education: "",
    experience: "",
    bio: "",
    location: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await ProfileService.getProfile();
      if (data && data.profile) {
        setProfile(data.profile);
      }
    } catch (error) {
      console.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await ProfileService.upsertProfile(profile);
      setIsEditing(false);
      alert("Profile updated successfully! 🎉");
    } catch (error) {
      alert("Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-indigo-600" size={40} />
          <p className="text-slate-400 font-bold animate-pulse">Loading Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 md:py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        
        {/* --- Header/Cover --- */}
        <div className="h-32 md:h-48 bg-gradient-to-r from-indigo-600 to-violet-700 relative">
          {!isEditing && (
            <button 
              type="button"
              onClick={() => setIsEditing(true)}
              className="absolute bottom-4 right-4 md:right-8 bg-white/20 backdrop-blur-md text-white border border-white/30 px-3 py-2 md:px-5 md:py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-white hover:text-indigo-600 transition-all z-10"
            >
              <Edit3 size={16} /> Edit Profile
            </button>
          )}
        </div>

        <div className="px-5 md:px-12 pb-10">
          {/* --- Avatar Section --- */}
          <div className="relative -mt-12 md:-mt-16 mb-8 flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 text-center md:text-left">
            <div className="h-24 w-24 md:h-36 md:w-36 bg-white p-1 rounded-[1.5rem] md:rounded-[2.2rem] shadow-xl">
              <div className="h-full w-full bg-slate-100 rounded-[1.3rem] md:rounded-[2rem] flex items-center justify-center text-slate-400">
                <User size={48} className="md:size-[64px]" />
              </div>
            </div>
            <div className="pb-2">
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">Your Profile</h2>
              <p className="text-slate-400 font-medium flex items-center justify-center md:justify-start gap-1 text-sm md:text-base">
                <MapPin size={16} /> {profile.location || "Location not set"}
              </p>
            </div>
          </div>

          {!isEditing ? (
            /* --- VIEW MODE --- */
            <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-300">
              <div className="flex-1 space-y-8">
                <section>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <AlignLeft size={16} /> About Me
                  </h3>
                  <div className="text-slate-600 leading-relaxed bg-slate-50 p-5 md:p-8 rounded-2xl md:rounded-[2rem] border border-slate-100 text-sm md:text-base">
                    {profile.bio || "Write something about yourself to stand out."}
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <section>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Briefcase size={16} /> Experience
                    </h3>
                    <div className="text-slate-600 text-sm bg-slate-50 p-5 rounded-2xl border border-slate-100 whitespace-pre-line min-h-[100px]">
                      {profile.experience || "Update your work history"}
                    </div>
                  </section>
                  <section>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <GraduationCap size={16} /> Education
                    </h3>
                    <div className="text-slate-600 text-sm bg-slate-50 p-5 rounded-2xl border border-slate-100 whitespace-pre-line min-h-[100px]">
                      {profile.education || "Add your academic background"}
                    </div>
                  </section>
                </div>
              </div>

              {/* Sidebar View */}
              <div className="w-full lg:w-80 space-y-6">
                <div className="bg-indigo-50/50 p-6 rounded-[2rem] border border-indigo-100/50">
                  <h3 className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-5">Connect</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-600 overflow-hidden">
                      <div className="p-2.5 bg-white rounded-xl shadow-sm text-indigo-600 shrink-0"><Github size={18}/></div>
                      <span className="text-xs font-bold truncate">{profile.githubUrl || "Github link"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 overflow-hidden">
                      <div className="p-2.5 bg-white rounded-xl shadow-sm text-blue-600 shrink-0"><Linkedin size={18}/></div>
                      <span className="text-xs font-bold truncate">{profile.linkedinUrl || "LinkedIn link"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 overflow-hidden">
                      <div className="p-2.5 bg-white rounded-xl shadow-sm text-emerald-600 shrink-0"><Phone size={18}/></div>
                      <span className="text-xs font-bold truncate">{profile.phone || "Add Phone"}</span>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                   <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Core Skills</h3>
                   <div className="flex flex-wrap gap-2">
                      {profile.skills ? profile.skills.split(',').map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-700 uppercase">
                          {skill.trim()}
                        </span>
                      )) : <p className="text-slate-300 text-xs italic">No skills listed</p>}
                   </div>
                </div>
              </div>
            </div>
          ) : (
            /* --- EDIT MODE (FORM) --- */
            <form onSubmit={handleSave} className="space-y-6 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <h3 className="font-black text-slate-800 text-lg">Edit Personal Info</h3>
                <button type="button" onClick={() => setIsEditing(false)} className="p-2 bg-slate-50 text-slate-400 hover:text-red-500 rounded-full transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Phone</label>
                  <input name="phone" value={profile.phone} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"/>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Location</label>
                  <input name="location" value={profile.location} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"/>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">GitHub URL</label>
                  <input name="githubUrl" value={profile.githubUrl} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"/>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">LinkedIn URL</label>
                  <input name="linkedinUrl" value={profile.linkedinUrl} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"/>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Bio</label>
                <textarea name="bio" value={profile.bio} onChange={handleChange} rows="3" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"/>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Education</label>
                  <textarea name="education" value={profile.education} onChange={handleChange} rows="3" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"/>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Experience</label>
                  <textarea name="experience" value={profile.experience} onChange={handleChange} rows="3" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"/>
                </div>
              </div>

              <div className="space-y-1.5 pb-4">
                <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Skills (React, Node...)</label>
                <input name="skills" value={profile.skills} onChange={handleChange} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"/>
              </div>

              <div className="flex flex-col md:flex-row justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsEditing(false)} className="w-full md:w-auto px-8 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 transition-all order-2 md:order-1">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="w-full md:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-10 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-70 order-1 md:order-2">
                  {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};