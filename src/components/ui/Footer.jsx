import React from "react";
import { usePortfolio } from "../../context/PortfolioContext";

export default function Footer() {
  const { profile = {} } = usePortfolio();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-8 md:px-20 py-8 border-t border-[rgba(0,245,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10 bg-[#030712]">
      <span className="mono text-[0.68rem] tracking-[1px] text-[rgba(232,234,246,0.25)]">
        © {currentYear} {profile.name || "Hassan Bin Nisar"}
      </span>
      <span className="orbitron text-[0.6rem] tracking-[3px] text-[rgba(0,245,255,0.25)] uppercase select-none">
        {profile.role || "MERN Stack Developer"}
      </span>
      <span className="mono text-[0.68rem] text-[rgba(232,234,246,0.25)] select-none">
        Built with React + Three.js ⚡
      </span>
    </footer>
  );
}
