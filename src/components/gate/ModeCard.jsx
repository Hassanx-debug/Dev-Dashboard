import React, { useState, useRef } from "react";

export default function ModeCard({ title, subtitle, hoverText, icon: Icon, accentColor, onClick }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    // Calculate rotation angle (max 10 degrees)
    const rX = -(mouseY / (height / 2)) * 10;
    const rY = (mouseX / (width / 2)) * 10;
    setRotate({ x: rX, y: rY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const isCyan = accentColor === "cyan";
  const glowClass = isCyan ? "hover:shadow-[0_0_55px_rgba(0,245,255,0.18)]" : "hover:shadow-[0_0_55px_rgba(168,85,247,0.18)]";
  const borderHoverClass = isCyan ? "hover:border-[#00f5ff]/50" : "hover:border-[#a855f7]/50";
  const iconBg = isCyan ? "bg-[#00f5ff]/10 text-[#00f5ff] border-[#00f5ff]/20" : "bg-[#a855f7]/10 text-[#a855f7] border-[#a855f7]/20";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="gate-card cursor-pointer group"
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
    >
      <div className={`gate-card-inner w-[300px] sm:w-[320px] h-[220px] rounded-2xl glass p-8 flex flex-col justify-between border border-white/5 transition-all duration-500 hover:bg-white/[0.06] ${glowClass} ${borderHoverClass}`}>
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${iconBg}`}>
            <Icon className="w-6 h-6" />
          </div>
          <span className="mono text-[10px] tracking-[4px] opacity-40 uppercase">Mode</span>
        </div>
        
        <div>
          <h3 className={`orbitron text-lg font-bold tracking-widest text-white transition-colors mb-2 ${isCyan ? "group-hover:text-[#00f5ff]" : "group-hover:text-[#a855f7]"}`}>
            {title}
          </h3>
          <p className="mono text-xs text-[rgba(232,234,246,0.55)] group-hover:hidden">
            {subtitle}
          </p>
          <p className={`mono text-xs hidden group-hover:block transition-all duration-300 font-bold ${isCyan ? "text-[#00f5ff]" : "text-[#a855f7]"}`}>
            {hoverText} →
          </p>
        </div>
      </div>
    </div>
  );
}
