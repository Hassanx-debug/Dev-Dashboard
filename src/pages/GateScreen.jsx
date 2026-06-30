import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Eye } from "lucide-react";
import AuroraBackground from "../components/gate/AuroraBackground";
import ModeCard from "../components/gate/ModeCard";
import PasswordModal from "../components/gate/PasswordModal";

export default function GateScreen() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleVisitor = () => {
    navigate("/portfolio");
  };

  const handleOwnerSuccess = () => {
    setModalOpen(false);
    navigate("/admin");
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-[#030712] text-white overflow-hidden select-none px-4">
      {/* Aurora mesh background */}
      <AuroraBackground />

      {/* Floating particles or content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-3"
        >
          <span className="mono text-[10px] tracking-[8px] uppercase text-[#00f5ff] font-bold">
            Project Genesis
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="orbitron text-3xl sm:text-5xl md:text-6xl font-black tracking-[8px] mb-6 shimmer-text select-none uppercase"
        >
          Hassan Bin Nisar
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mono text-xs sm:text-sm text-[rgba(232,234,246,0.6)] tracking-wide max-w-lg mb-16 leading-relaxed"
        >
          BSCS student & Full-Stack MERN Developer. Welcome to the Command Center. Select your access protocol below.
        </motion.p>

        {/* Cards Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, type: "spring" }}
          className="flex flex-col md:flex-row gap-8 items-center justify-center w-full"
        >
          <ModeCard
            title="CONTROL TERMINAL"
            subtitle="Decrypt key to access developer control board, modify live projects, and customize interface."
            hoverText="INITIATE KEY DECRYPTION"
            icon={Shield}
            accentColor="cyan"
            onClick={() => setModalOpen(true)}
          />

          <ModeCard
            title="VISITOR VIEWPORT"
            subtitle="Browse accomplishments, work history, interactive GitHub contributions, and contact logs."
            hoverText="ESTABLISH VIEWPORT CONNECTION"
            icon={Eye}
            accentColor="purple"
            onClick={handleVisitor}
          />
        </motion.div>
      </div>

      <PasswordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleOwnerSuccess}
      />
    </div>
  );
}
