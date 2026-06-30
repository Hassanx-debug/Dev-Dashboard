import React from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { Users, Calendar } from "lucide-react";

export default function AnalyticsDashboard() {
  const { analytics = {} } = usePortfolio();

  const totalVisits = analytics.totalVisits || 0;
  const lastVisit = analytics.lastVisit ? new Date(analytics.lastVisit).toLocaleString() : "No visits recorded";
  const sectionViews = analytics.sectionViews || {};
  const visitHistory = analytics.visitHistory || [];

  // Get last 7 days of visit history for SVG chart
  const chartData = visitHistory.slice(-7);
  const maxCount = Math.max(...chartData.map((d) => d.count), 5);

  return (
    <div className="flex flex-col gap-6 text-white max-w-2xl max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
      <div className="flex flex-col">
        <h4 className="orbitron text-xs font-bold tracking-widest text-[#00f5ff] uppercase mb-1">
          Visitor Access Telemetry
        </h4>
        <p className="mono text-[10px] text-white/50 tracking-wider">
          Client-side tracking data captured via secure browser-level observers.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass p-5 rounded-xl border border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#00f5ff]/10 border border-[#00f5ff]/20 flex items-center justify-center text-[#00f5ff]">
            <Users className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="mono text-[9px] text-white/40 uppercase">Total Sessions</span>
            <span className="orbitron text-xl font-black text-white">{totalVisits}</span>
          </div>
        </div>

        <div className="glass p-5 rounded-xl border border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#a855f7]/10 border border-[#a855f7]/20 flex items-center justify-center text-[#a855f7]">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="mono text-[9px] text-white/40 uppercase">Last Interaction</span>
            <span className="mono text-xs text-white truncate block max-w-[200px]">
              {lastVisit}
            </span>
          </div>
        </div>
      </div>

      {/* SVG Visit History Chart */}
      <div className="glass p-5 rounded-xl border border-white/5 flex flex-col gap-3">
        <span className="orbitron text-[10px] font-bold tracking-widest text-white/70 uppercase">
          7-Day Session Frequency
        </span>
        
        {chartData.length === 0 ? (
          <p className="mono text-[10px] text-white/40 text-center py-6">Telemetry stream compiling...</p>
        ) : (
          <div className="flex items-end justify-between h-[120px] gap-2 pt-4 px-2">
            {chartData.map((d, i) => {
              const heightPercentage = (d.count / maxCount) * 100;
              return (
                <div key={i} className="flex flex-col items-center gap-2 flex-1 group relative">
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 bg-[#0a0f1e] border border-white/10 px-2 py-0.5 rounded mono text-[8px] text-[#00f5ff] transition-opacity z-10">
                    {d.count}
                  </span>
                  
                  {/* Bar */}
                  <div
                    className="w-full bg-gradient-to-t from-[#a855f7]/20 to-[#00f5ff]/60 border border-[#00f5ff]/35 rounded-t hover:to-[#00f5ff] transition-all duration-300"
                    style={{ height: `${heightPercentage}%` }}
                  />
                  
                  {/* Label */}
                  <span className="mono text-[8px] text-white/30 truncate max-w-[40px]">
                    {d.date.substring(5)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Section Views List */}
      <div className="glass p-5 rounded-xl border border-white/5 flex flex-col gap-3">
        <span className="orbitron text-[10px] font-bold tracking-widest text-white/70 uppercase">
          Section Interest Hotspots
        </span>
        
        <div className="flex flex-col gap-2">
          {Object.keys(sectionViews).length === 0 ? (
            <p className="mono text-[10px] text-white/40 text-center py-4">No content intersections captured yet.</p>
          ) : (
            Object.entries(sectionViews)
              .sort((a, b) => b[1] - a[1])
              .map(([section, count]) => (
                <div key={section} className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                  <span className="mono text-white/60 capitalize">#{section}</span>
                  <span className="orbitron text-[#00f5ff] font-bold">{count} view{count !== 1 ? "s" : ""}</span>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
