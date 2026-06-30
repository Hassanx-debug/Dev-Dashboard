import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "../../context/PortfolioContext";
import { useAuth } from "../../context/AuthContext";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import AnimatedButton from "./AnimatedButton";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { navLinks = [], profile = {} } = usePortfolio();
  const { isAdmin } = useAuth();
  
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isGateRoute = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isGateRoute || location.pathname.startsWith("/admin/dashboard")) return null;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-5 flex items-center justify-between transition-all duration-500 ${
        scrolled ? "bg-[rgba(2,4,8,0.9)] backdrop-blur-xl border-b border-[rgba(0,245,255,0.06)]" : ""
      }`}
    >
      {/* Logo & Admin Status */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/")}
          className="orbitron font-black text-lg text-gradient tracking-widest cursor-pointer select-none bg-transparent border-0 outline-none"
        >
          HBN
        </button>

        {isAdminRoute && isAdmin && (
          <span className="mono text-[8px] bg-[#00f5ff]/10 text-[#00f5ff] border border-[#00f5ff]/20 px-2 py-0.5 rounded uppercase tracking-widest font-bold flex items-center gap-1">
            <ShieldAlert className="w-2.5 h-2.5" /> LIVE CMS
          </span>
        )}
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i + 0.1 }}
            className="mono text-[0.72rem] tracking-[3px] uppercase text-[rgba(232,234,246,0.55)] hover:text-[#00f5ff] transition-colors duration-300 cursor-pointer"
          >
            {link.label}
          </motion.a>
        ))}

        {isAdminRoute && isAdmin ? (
          <AnimatedButton
            onClick={() => navigate("/admin/dashboard")}
            variant="outline"
            className="py-1.5 px-4 text-[9px] font-bold"
          >
            Dashboard
          </AnimatedButton>
        ) : (
          <a
            href={profile.resumeBase64 ? profile.resumeBase64 : "#contact"}
            download={profile.resumeBase64 ? "Hassan_Bin_Nisar_Resume.pdf" : undefined}
            target={profile.resumeBase64 ? "_blank" : undefined}
            rel="noreferrer"
            className="mono text-[0.72rem] tracking-[2px] uppercase px-5 py-2.5 border border-[#00f5ff]/30 text-[#00f5ff] hover:bg-[#00f5ff]/5 rounded-sm transition-all cursor-pointer"
          >
            {profile.resumeBase64 ? "Get Resume" : "Hire Me"}
          </a>
        )}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-[#00f5ff] flex flex-col gap-1.5 cursor-pointer z-50 bg-transparent border-0 outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={`block w-6 h-px bg-[#00f5ff] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-px bg-[#00f5ff] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-px bg-[#00f5ff] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-t border-[rgba(0,245,255,0.06)] p-6 flex flex-col gap-4 md:hidden z-40 bg-[rgba(2,4,8,0.95)]"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="mono text-sm tracking-[3px] uppercase text-[rgba(232,234,246,0.7)] hover:text-[#00f5ff] transition-colors"
              >
                {link.label}
              </a>
            ))}

            {isAdminRoute && isAdmin ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/admin/dashboard");
                }}
                className="mono text-sm tracking-[3px] uppercase text-[#00f5ff] border border-[#00f5ff]/35 py-2 text-center rounded bg-transparent"
              >
                Dashboard
              </button>
            ) : (
              <a
                href={profile.resumeBase64 ? profile.resumeBase64 : "#contact"}
                download={profile.resumeBase64 ? "Hassan_Bin_Nisar_Resume.pdf" : undefined}
                target={profile.resumeBase64 ? "_blank" : undefined}
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mono text-sm tracking-[3px] uppercase text-[#00f5ff] border border-[#00f5ff]/35 py-2 text-center rounded block"
              >
                {profile.resumeBase64 ? "Get Resume" : "Hire Me"}
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
