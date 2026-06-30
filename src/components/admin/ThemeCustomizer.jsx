import React from "react";
import { usePortfolio } from "../../context/PortfolioContext";

export default function ThemeCustomizer() {
  const { theme = {}, dispatch } = usePortfolio();

  const colors = [
    { label: "Accent Cyan", key: "accentCyan", cssVar: "--cyan" },
    { label: "Accent Purple", key: "accentPurple", cssVar: "--purple" },
    { label: "Accent Gold", key: "accentGold", cssVar: "--gold" },
  ];

  const handleColorChange = (key, cssVar, value) => {
    dispatch({
      type: "UPDATE_THEME",
      payload: { [key]: value },
    });

    // Update CSS variable in document element
    document.documentElement.style.setProperty(cssVar, value);
  };

  return (
    <div className="flex flex-col gap-6 text-white max-w-sm">
      <div className="flex flex-col">
        <h4 className="orbitron text-xs font-bold tracking-widest text-[#00f5ff] uppercase mb-1">
          Interface Accent Customization
        </h4>
        <p className="mono text-[10px] text-white/50 tracking-wider">
          Customize primary glow elements and accent colors of the portfolio.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {colors.map((c) => (
          <div key={c.key} className="glass p-4 rounded-xl border border-white/5 flex items-center justify-between gap-4">
            <span className="mono text-xs text-white/70 font-semibold">{c.label}</span>
            <div className="flex items-center gap-3">
              <span className="mono text-[10px] text-white/40">{theme[c.key]}</span>
              <input
                type="color"
                value={theme[c.key] || "#ffffff"}
                onChange={(e) => handleColorChange(c.key, c.cssVar, e.target.value)}
                className="w-8 h-8 rounded border-0 bg-transparent cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
