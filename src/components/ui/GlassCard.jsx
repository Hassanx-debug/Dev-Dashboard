import React from "react";

export default function GlassCard({ children, className = "", onClick, hoverGlow = "cyan" }) {
  const glowStyles = {
    cyan: "hover:shadow-[0_0_30px_rgba(0,245,255,0.1)] hover:border-[#00f5ff]/20",
    purple: "hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] hover:border-[#a855f7]/20",
    gold: "hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] hover:border-[#f59e0b]/20",
  };

  return (
    <div
      onClick={onClick}
      className={`glass rounded-xl border border-white/5 bg-white/2 backdrop-blur-lg transition-all duration-300 hover:bg-white/[0.05] ${
        glowStyles[hoverGlow] || ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
