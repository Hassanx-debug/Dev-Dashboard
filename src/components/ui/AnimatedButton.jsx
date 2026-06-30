import React from "react";
import { motion } from "framer-motion";

export default function AnimatedButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}) {
  const baseStyle =
    "px-5 py-2.5 rounded-lg mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer select-none";

  const styles = {
    primary:
      "bg-gradient-to-r from-[#00f5ff]/80 to-[#a855f7]/80 hover:from-[#00f5ff] hover:to-[#a855f7] text-white border border-transparent shadow-[0_0_20px_rgba(0,245,255,0.15)]",
    secondary:
      "bg-[#0a0f1e] hover:bg-white/[0.08] text-white border border-white/10 hover:border-[#00f5ff]/30",
    outline:
      "bg-transparent border border-[#00f5ff]/30 text-[#00f5ff] hover:bg-[#00f5ff]/5",
    danger:
      "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.1)]",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseStyle} ${styles[variant]} ${disabled ? "opacity-40 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </motion.button>
  );
}
