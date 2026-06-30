import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  User,
  Layers,
  Database,
  FileText,
  Palette,
  LineChart,
  Settings,
  ArrowLeft,
  LogOut
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { usePortfolio } from "../context/PortfolioContext";
import SectionEditor from "../components/admin/SectionEditor";
import ProjectManager from "../components/admin/ProjectManager";
import ResumeUploader from "../components/admin/ResumeUploader";
import ThemeCustomizer from "../components/admin/ThemeCustomizer";
import AnalyticsDashboard from "../components/admin/AnalyticsDashboard";
import DataExporter from "../components/admin/DataExporter";
import AnimatedButton from "../components/ui/AnimatedButton";
import Cursor from "../components/ui/Cursor";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdmin, logout } = useAuth();
  const { profile = {}, dispatch } = usePortfolio();

  const [activeTab, setActiveTab] = useState("profile");

  // Redirect if not authorized
  React.useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  const menuItems = [
    { id: "profile", label: "Profile Specs", icon: User },
    { id: "projects", label: "Showcase Projects", icon: Layers },
    { id: "sections", label: "Data Nodes", icon: Database },
    { id: "resume", label: "Resume Hub", icon: FileText },
    { id: "theme", label: "Visual Theme", icon: Palette },
    { id: "telemetry", label: "Telemetry Info", icon: LineChart },
    { id: "config", label: "Data Export", icon: Settings },
  ];

  const handleProfileSave = (field, value) => {
    dispatch({
      type: "UPDATE_PROFILE",
      payload: { [field]: value },
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="flex flex-col gap-6 text-white max-w-xl max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex flex-col">
              <h4 className="orbitron text-xs font-bold tracking-widest text-[#00f5ff] uppercase mb-1">
                Developer Profile Parameters
              </h4>
              <p className="mono text-[10px] text-white/50 tracking-wider">
                Edit core identification metrics shown in the public viewport.
              </p>
            </div>

            <div className="glass p-6 rounded-xl border border-white/5 bg-white/2 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={profile.name || ""}
                  onChange={(e) => handleProfileSave("name", e.target.value)}
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Primary Role Title</label>
                <input
                  type="text"
                  value={profile.role || ""}
                  onChange={(e) => handleProfileSave("role", e.target.value)}
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Tagline</label>
                <input
                  type="text"
                  value={profile.tagline || ""}
                  onChange={(e) => handleProfileSave("tagline", e.target.value)}
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Bio Intro Summary</label>
                <textarea
                  value={profile.intro || ""}
                  onChange={(e) => handleProfileSave("intro", e.target.value)}
                  rows={2}
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff] w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Detailed About Paragraph</label>
                <textarea
                  value={profile.about || ""}
                  onChange={(e) => handleProfileSave("about", e.target.value)}
                  rows={4}
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff] w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Location</label>
                  <input
                    type="text"
                    value={profile.location || ""}
                    onChange={(e) => handleProfileSave("location", e.target.value)}
                    className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="mono text-[9px] text-white/50 uppercase tracking-wider">GitHub Username</label>
                  <input
                    type="text"
                    value={profile.githubUsername || ""}
                    onChange={(e) => handleProfileSave("githubUsername", e.target.value)}
                    className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Contact Email</label>
                  <input
                    type="email"
                    value={profile.email || ""}
                    onChange={(e) => handleProfileSave("email", e.target.value)}
                    className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="mono text-[9px] text-white/50 uppercase tracking-wider">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={profile.linkedin || ""}
                    onChange={(e) => handleProfileSave("linkedin", e.target.value)}
                    className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "projects":
        return <ProjectManager />;
      case "sections":
        return <SectionEditor />;
      case "resume":
        return <ResumeUploader />;
      case "theme":
        return <ThemeCustomizer />;
      case "telemetry":
        return <AnalyticsDashboard />;
      case "config":
        return <DataExporter />;
      default:
        return null;
    }
  };

  if (!isAdmin) return null;

  return (
    <>
      <Cursor />
      <div className="w-screen h-screen flex flex-col bg-[#030712] text-white overflow-hidden relative font-sans">
      {/* Dynamic Aurora background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(0,245,255,0.08)_0%,transparent_70%)] filter blur-[80px] aurora-blob-1" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.08)_0%,transparent_70%)] filter blur-[80px] aurora-blob-2" />
        <div className="absolute inset-0 grid-bg opacity-[0.2]" />
      </div>

      {/* Header bar */}
      <header className="relative z-10 h-16 border-b border-white/10 bg-black/40 backdrop-blur-md px-6 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-[#00f5ff]" />
          <span className="orbitron font-black text-sm tracking-[4px] text-white">
            GENESIS_COMMAND_CENTER
          </span>
          <span className="mono text-[8px] bg-[#00f5ff]/10 text-[#00f5ff] border border-[#00f5ff]/20 px-2 py-0.5 rounded uppercase tracking-widest font-bold">
            CMS v1.0
          </span>
        </div>

        <div className="flex items-center gap-4">
          <AnimatedButton
            onClick={() => navigate("/portfolio")}
            variant="outline"
            className="py-1 px-4 text-[10px] tracking-widest"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return Portfolio
          </AnimatedButton>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            title="Log out"
            className="p-2 text-white/50 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Sidebar Layout */}
      <div className="relative z-10 flex-1 flex overflow-hidden">
        {/* Left menu */}
        <aside className="w-64 border-r border-white/10 bg-black/20 backdrop-blur-sm p-6 flex flex-col gap-2 flex-shrink-0">
          <span className="mono text-[9px] text-white/30 uppercase tracking-widest block mb-4 px-2">
            Control Protocol Channel
          </span>

          <nav className="flex flex-col gap-1.5 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mono text-xs font-bold tracking-wider text-left transition-all border cursor-pointer ${
                    isActive
                      ? "bg-[#00f5ff]/10 border-[#00f5ff]/20 text-[#00f5ff] shadow-[0_0_15px_rgba(0,245,255,0.05)]"
                      : "border-transparent text-white/55 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Editor display viewport */}
        <main className="flex-1 bg-black/10 p-8 md:p-10 overflow-hidden">
          <div className="h-full w-full max-w-5xl mx-auto flex flex-col">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
    </>
  );
}
