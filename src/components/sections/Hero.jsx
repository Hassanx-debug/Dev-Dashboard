import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "../../context/PortfolioContext";
import { useAuth } from "../../context/AuthContext";
import InlineEditor from "../admin/InlineEditor";
import HeroCube from "../three/HeroCube";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Hero() {
  const { profile = {}, dispatch } = usePortfolio();
  const { isEditMode } = useAuth();

  const displayRole = profile.roles?.[0] || "Full Stack Developer";

  const handleUpdateProfile = (field, value) => {
    dispatch({
      type: "UPDATE_PROFILE",
      payload: { [field]: value },
    });
  };

  const nameParts = (profile.name || "Hassan Bin Nisar").split(" ");
  const firstName = nameParts[0] || "Hassan";
  const lastName = nameParts.slice(1).join(" ") || "Bin Nisar";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-8 md:px-20 grid-bg overflow-hidden"
    >
      {/* Gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,245,255,0.03)] via-transparent to-[rgba(179,71,234,0.04)] pointer-events-none z-0" />

      <div className="relative z-10 w-full grid md:grid-cols-2 gap-12 items-center pt-24 pb-16">
        {/* LEFT: Text content */}
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Badge */}
          <motion.div variants={item} className="inline-flex items-center gap-2 mono text-[0.7rem] tracking-[2px] text-[#00f5ff] border border-[#00f5ff]/20 px-4 py-2 rounded-sm bg-[#00f5ff]/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] blink" />
            <InlineEditor
              value={profile.location || "Islamabad, Pakistan"}
              onSave={(val) => handleUpdateProfile("location", val)}
              className="uppercase font-bold"
            />
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="orbitron font-black leading-[1.05] mb-4"
            style={{ fontSize: "clamp(2.6rem, 5vw, 4.4rem)" }}
          >
            {isEditMode ? (
              <InlineEditor
                value={profile.name || "Hassan Bin Nisar"}
                onSave={(val) => handleUpdateProfile("name", val)}
                className="text-gradient block"
              />
            ) : (
              <>
                <span className="text-gradient">{firstName}</span>
                <br />
                <span className="text-gradient">{lastName}</span>
              </>
            )}
          </motion.h1>

          {/* Role Title */}
          <motion.div variants={item} className="mono text-[#00f5ff] text-lg mb-4 tracking-wide h-8 flex items-center">
            <span>{'< '}</span>
            <span className="font-semibold">{displayRole}</span>
            <span>{' />'}</span>
          </motion.div>

          {/* Tagline */}
          <motion.p variants={item} className="text-[rgba(232,234,246,0.6)] leading-relaxed max-w-xl mb-8 text-[0.97rem]">
            <InlineEditor
              value={profile.tagline || ""}
              onSave={(val) => handleUpdateProfile("tagline", val)}
              type="textarea"
            />
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-4 mb-12">
            <a
              href="#contact"
              className="px-7 py-3.5 text-[0.82rem] mono tracking-[2px] uppercase font-semibold rounded-sm text-[#020408] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer z-10 relative overflow-hidden group"
              style={{ background: "linear-gradient(135deg, var(--cyan), var(--purple))", boxShadow: "0 0 30px rgba(0,245,255,0.2)" }}
            >
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </a>
            <a
              href="#projects"
              className="px-7 py-3.5 text-[0.82rem] mono tracking-[2px] uppercase rounded-sm border border-[rgba(0,245,255,0.3)] text-[#00f5ff] hover:bg-[#00f5ff]/5 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer z-10"
            >
              View Projects
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="flex gap-10 border-t border-[rgba(0,245,255,0.08)] pt-6"
          >
            {[
              { val: "MERN", label: "Core Stack" },
              { val: "AI+", label: "Dev Workflows" },
              { val: "∞", label: "Ambition" },
            ].map(({ val, label }) => (
              <div key={label}>
                <div className="orbitron text-2xl font-bold text-[#00f5ff] leading-none">{val}</div>
                <div className="mono text-[0.68rem] tracking-[2px] uppercase text-[rgba(232,234,246,0.4)] mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: 3D Cube + Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          {/* Orbit rings */}
          <div className="absolute w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] top-1/2 left-1/2 orbit-spin rounded-full border border-[rgba(0,245,255,0.08)]" style={{ transform: "translate(-50%,-50%)" }}>
            <div className="absolute -top-1.5 left-1/2 w-3 h-3 -ml-1.5 rounded-full bg-[#00f5ff]" style={{ boxShadow: "0 0 10px var(--cyan)" }} />
          </div>
          <div className="absolute w-[460px] h-[460px] sm:w-[550px] sm:h-[550px] top-1/2 left-1/2 orbit-spin-slow rounded-full border border-[rgba(168,85,247,0.06)]" style={{ transform: "translate(-50%,-50%)" }}>
            <div className="absolute -top-1.5 left-1/2 w-2.5 h-2.5 -ml-1.5 rounded-full bg-purple-400" style={{ boxShadow: "0 0 10px var(--purple)" }} />
          </div>

          {/* Photo frame */}
          <div className="relative w-60 h-72 sm:w-64 sm:h-80 float">
            {/* Animated border */}
            <div
              className="absolute inset-[-2px] rounded-md z-[-1]"
              style={{ background: "linear-gradient(135deg, var(--cyan), transparent, var(--purple))" }}
            />
            <div className="relative w-full h-full rounded overflow-hidden border border-[rgba(0,245,255,0.15)] bg-gradient-to-br from-[#0d1117] to-[#1a0a2e]">
              {/* Scan line */}
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00f5ff] to-transparent scan-line z-20" />

              {/* Photo placeholder — replace src with actual image */}
              <img
                src={profile.photoUrl || "/hassan.jpg"}
                alt={profile.name || "Hassan Bin Nisar"}
                className="w-full h-full object-cover"
                style={{ filter: "contrast(1.05) saturate(0.85)", mixBlendMode: "luminosity", opacity: 0.9 }}
                onError={(e) => { e.target.style.display = "none"; }}
              />

              {/* Fallback avatar */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 bg-black/40">
                <div className="text-6xl opacity-35">👤</div>
                <div className="mono text-[0.6rem] tracking-[2px] text-[#00f5ff] opacity-60">HASSAN BIN NISAR</div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(2,4,8,0.7)] via-transparent to-[rgba(179,71,234,0.08)] z-10" />

              {/* Corner brackets */}
              {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((cls, i) => (
                <div key={i} className={`absolute w-5 h-5 border-[#00f5ff] z-20 ${cls}`} />
              ))}

              {/* Label */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between z-20">
                <span className="mono text-[0.58rem] tracking-[2px] text-[#00f5ff] uppercase">Full-Stack Dev</span>
                <span className="mono text-[0.58rem] tracking-[1px] text-green-400 uppercase">● Online</span>
              </div>
            </div>
          </div>

          {/* Mini 3D cube beside photo */}
          <div className="absolute -right-4 -bottom-4 w-32 h-32 sm:w-36 sm:h-36 opacity-85">
            <HeroCube />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="mono text-[0.6rem] tracking-[3px] text-[rgba(232,234,246,0.3)] uppercase">Scroll</span>
        <div className="w-px h-14 bg-gradient-to-b from-[#00f5ff] to-transparent animate-bounce" />
      </div>
    </section>
  );
}
