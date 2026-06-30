import React, { useRef, useState } from "react";
import { Download, Upload, AlertTriangle } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import AnimatedButton from "../ui/AnimatedButton";

export default function DataExporter() {
  const { exportData, importData, resetData } = usePortfolio();
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState("");

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        const res = importData(result);
        if (res.success) {
          setStatus("Data imported successfully! Reloading site settings...");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          setStatus(`Import failed: ${res.error}`);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm("Are you absolutely sure you want to reset all portfolio data to defaults? This cannot be undone.")) {
      resetData();
      setStatus("Reset successful. Reloading settings...");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-white max-w-md">
      <div className="flex flex-col">
        <h4 className="orbitron text-xs font-bold tracking-widest text-[#00f5ff] uppercase mb-1">
          Configuration Management
        </h4>
        <p className="mono text-[10px] text-white/50 tracking-wider">
          Export, restore, or completely reset the state configuration nodes of your portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Export Card */}
        <div className="glass p-5 rounded-xl border border-white/5 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#00f5ff]/10 border border-[#00f5ff]/20 flex items-center justify-center text-[#00f5ff]">
              <Download className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="orbitron text-[10px] font-bold text-white uppercase tracking-wider">Backup JSON State</span>
              <span className="mono text-[8px] text-white/40">Download configuration nodes as a local JSON file.</span>
            </div>
          </div>
          <AnimatedButton onClick={exportData} variant="outline" className="py-1.5 w-full">
            Download JSON
          </AnimatedButton>
        </div>

        {/* Import Card */}
        <div className="glass p-5 rounded-xl border border-white/5 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#a855f7]/10 border border-[#a855f7]/20 flex items-center justify-center text-[#a855f7]">
              <Upload className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="orbitron text-[10px] font-bold text-white uppercase tracking-wider">Restore JSON State</span>
              <span className="mono text-[8px] text-white/40">Restore your portfolio config from a previous JSON backup.</span>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
          <AnimatedButton onClick={handleImportClick} variant="outline" className="py-1.5 w-full">
            Upload JSON
          </AnimatedButton>
        </div>

        {/* Reset Card */}
        <div className="glass p-5 rounded-xl border border-red-500/10 bg-red-500/2 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="orbitron text-[10px] font-bold text-white uppercase tracking-wider text-red-400 font-bold">Wipe Database</span>
              <span className="mono text-[8px] text-red-400/60">Completely reset the LocalStorage config to defaults.</span>
            </div>
          </div>
          <AnimatedButton onClick={handleReset} variant="danger" className="py-1.5 w-full">
            Reset to Default
          </AnimatedButton>
        </div>
      </div>

      {status && (
        <p className="mono text-[9px] text-[#00f5ff] uppercase font-bold tracking-widest text-center mt-2 animate-pulse">
          {status}
        </p>
      )}
    </div>
  );
}
