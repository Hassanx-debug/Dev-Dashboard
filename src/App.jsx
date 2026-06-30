import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GateScreen from "./pages/GateScreen";
import Portfolio from "./pages/Portfolio";
import AdminDashboard from "./pages/AdminDashboard";
import { usePortfolio } from "./context/PortfolioContext";

export default function App() {
  const { theme = {} } = usePortfolio();

  // Load custom theme properties on mount and changes
  useEffect(() => {
    if (theme.accentCyan) {
      document.documentElement.style.setProperty("--cyan", theme.accentCyan);
    }
    if (theme.accentPurple) {
      document.documentElement.style.setProperty("--purple", theme.accentPurple);
    }
    if (theme.accentGold) {
      document.documentElement.style.setProperty("--gold", theme.accentGold);
    }
  }, [theme]);

  return (
    <Routes>
      {/* Cinematic entry gate screen */}
      <Route path="/" element={<GateScreen />} />
      
      {/* Public viewport view */}
      <Route path="/portfolio" element={<Portfolio />} />
      
      {/* Admin viewport view */}
      <Route path="/admin" element={<Portfolio />} />
      
      {/* Admin full CMS Command Center */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      
      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
