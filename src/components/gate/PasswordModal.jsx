import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, CheckCircle2, Lock, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function PasswordModal({ isOpen, onClose, onSuccess }) {
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isGranted, setIsGranted] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      setIsGranted(true);
      setTimeout(() => {
        setIsGranted(false);
        setPassword("");
        onSuccess();
      }, 1500);
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 800);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className={`relative w-full max-w-[400px] rounded-2xl glass p-8 border border-white/10 z-10 ${
              isError ? "shake border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.2)]" : ""
            } ${
              isGranted ? "border-green-500/50 shadow-[0_0_40px_rgba(34,197,94,0.2)]" : ""
            }`}
          >
            {/* Close Button */}
            {!isGranted && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-[rgba(232,234,246,0.4)] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {isGranted ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.2 }}
                  transition={{ type: "spring", damping: 10 }}
                  className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 mb-4"
                >
                  <CheckCircle2 className="w-8 h-8" />
                </motion.div>
                <h3 className="orbitron text-lg font-black tracking-widest text-green-400 mb-1">
                  ACCESS GRANTED
                </h3>
                <p className="mono text-[10px] text-green-500/70 tracking-widest uppercase">
                  Initializing Administrator Profile
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan mb-4">
                    <Lock className="w-5 h-5 text-[#00f5ff]" />
                  </div>
                  <h3 className="orbitron text-base font-bold tracking-widest text-white">
                    OWNER AUTHENTICATION
                  </h3>
                  <p className="mono text-[10px] text-[rgba(232,234,246,0.4)] tracking-wider mt-1">
                    Enter key to access control terminal
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="ENTER ACCESS KEY"
                    autoFocus
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 mono text-xs text-center text-white tracking-[6px] focus:outline-none focus:border-[#00f5ff]/50 focus:shadow-[0_0_20px_rgba(0,245,255,0.1)] transition-all"
                  />
                  {isError && (
                    <div className="flex items-center justify-center gap-1.5 text-red-400 mono text-[9px] tracking-wider uppercase mt-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Access Key Rejected
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#00f5ff]/80 to-[#a855f7]/80 hover:from-[#00f5ff] hover:to-[#a855f7] py-3 rounded-lg orbitron text-xs font-bold tracking-[4px] text-white shadow-[0_0_30px_rgba(0,245,255,0.15)] transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  DECRYPT KEY
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
