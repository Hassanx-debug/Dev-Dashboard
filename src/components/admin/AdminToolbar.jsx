import React from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, RotateCcw, Download } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { usePortfolio } from "../../context/PortfolioContext";

export default function AdminToolbar({ onOpenDashboard }) {
  const navigate = useNavigate();
  const {
    isAdmin,
    logout,
  } = useAuth();

  const { exportData, resetData } = usePortfolio();

  if (!isAdmin) return null;

  const handleReset = () => {
    if (window.confirm("Are you absolutely sure you want to reset all portfolio data to defaults? This cannot be undone.")) {
      resetData();
    }
  };

  return (
    <div className="admin-toolbar flex items-center gap-3 bg-[#0a0f1e]/85 backdrop-blur-xl border border-white/10 px-6 py-3.5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] glow-border-cyan">
      {/* Indicator */}
      <div className="flex items-center gap-2 pr-3 border-r border-white/10 mr-1">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5ff] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00f5ff]"></span>
        </span>
        <span className="mono text-[10px] text-white tracking-[2px] font-bold uppercase">ADMIN</span>
      </div>

      {/* Full Dashboard CMS */}
      <button
        onClick={onOpenDashboard}
        title="Open CMS Dashboard"
        className="p-2 text-[rgba(232,234,246,0.6)] hover:bg-white/5 hover:text-white rounded-full transition-all cursor-pointer"
      >
        <LayoutDashboard className="w-4 h-4" />
      </button>

      {/* Export JSON */}
      <button
        onClick={exportData}
        title="Export Backup JSON"
        className="p-2 text-[rgba(232,234,246,0.6)] hover:bg-white/5 hover:text-white rounded-full transition-all cursor-pointer"
      >
        <Download className="w-4 h-4" />
      </button>

      {/* Reset */}
      <button
        onClick={handleReset}
        title="Reset all to defaults"
        className="p-2 text-[rgba(232,234,246,0.6)] hover:bg-red-500/10 hover:text-red-400 rounded-full transition-all cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
      </button>

      {/* Exit Admin Mode */}
      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        title="Logout and Return Home"
        className="p-2 text-[rgba(232,234,246,0.6)] hover:bg-red-500/20 hover:text-red-400 rounded-full transition-all cursor-pointer border-l border-white/10 pl-3 ml-1"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}
