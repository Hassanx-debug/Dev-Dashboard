import React from "react";

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Aurora Orbs */}
      <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(0,245,255,0.12)_0%,transparent_70%)] filter blur-[100px] aurora-blob-1" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[70%] h-[70%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,transparent_70%)] filter blur-[100px] aurora-blob-2" />
      <div className="absolute top-[30%] right-[10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.07)_0%,transparent_70%)] filter blur-[100px] aurora-blob-3" />
      <div className="absolute bottom-[20%] left-[10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(0,245,255,0.08)_0%,transparent_70%)] filter blur-[100px] aurora-blob-4" />
      
      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-[0.3]" />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none noise-overlay" />
    </div>
  );
}
