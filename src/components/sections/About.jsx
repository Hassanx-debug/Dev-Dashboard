import React from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "../../context/PortfolioContext";
import { useAuth } from "../../context/AuthContext";
import SectionLabel from "../ui/SectionLabel";
import InlineEditor from "../admin/InlineEditor";

export default function About() {
  const { profile = {}, careerFocus = [], dispatch } = usePortfolio();
  const { isEditMode } = useAuth();

  const handleUpdateProfile = (field, value) => {
    dispatch({
      type: "UPDATE_PROFILE",
      payload: { [field]: value },
    });
  };

  return (
    <section id="about" className="section-pad px-8 md:px-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,245,255,0.01)] to-transparent pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start relative z-10">
        {/* Left */}
        <div>
          <SectionLabel number="01" label="About" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="orbitron text-4xl font-bold text-gradient mb-6"
          >
            Who I Am
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[rgba(232,234,246,0.65)] leading-relaxed mb-5 text-[0.95rem] flex flex-col gap-5"
          >
            <p>
              <InlineEditor
                value={profile.intro || "I'm a BSCS student at Air University Islamabad who turned curiosity into craft."}
                onSave={(val) => handleUpdateProfile("intro", val)}
                type="textarea"
              />
            </p>
            <p>
              <InlineEditor
                value={profile.about || ""}
                onSave={(val) => handleUpdateProfile("about", val)}
                type="textarea"
              />
            </p>
          </motion.div>

          {/* Career focus tags */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2.5 mt-6"
          >
            {careerFocus.map((f, i) => (
              <motion.span
                key={f}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
                whileHover={{ scale: 1.05 }}
                className="mono text-[0.72rem] tracking-[1px] uppercase px-4 py-2 border border-[rgba(0,245,255,0.2)] text-[#00f5ff] rounded-sm bg-[rgba(0,245,255,0.03)] hover:bg-[rgba(0,245,255,0.07)] hover:border-[#00f5ff] transition-all"
              >
                {f}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Right: Education card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="glass rounded-md p-7 relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00f5ff] to-[#a855f7]" />

            <div className="mono text-[0.65rem] tracking-[2px] text-[#00f5ff] uppercase mb-1">Education</div>
            <div className="orbitron text-[#00f5ff] text-lg font-bold mb-1">
              <InlineEditor
                value={profile.university || "Air University Islamabad"}
                onSave={(val) => handleUpdateProfile("university", val)}
              />
            </div>
            <div className="text-white font-semibold text-xl mb-1">
              <InlineEditor
                value={profile.degree || "BSCS — Bachelor of Computer Science"}
                onSave={(val) => handleUpdateProfile("degree", val)}
              />
            </div>
            <div className="text-[rgba(232,234,246,0.5)] text-sm">
              <InlineEditor
                value={profile.location || "Islamabad, PK"}
                onSave={(val) => handleUpdateProfile("location", val)}
              />
            </div>

            <div className="border-t border-[rgba(0,245,255,0.08)] mt-6 pt-5">
              <div className="mono text-[0.68rem] tracking-[2px] text-[rgba(232,234,246,0.4)] uppercase mb-4">Currently Focused On</div>
              <div className="flex flex-col gap-3">
                {[
                  { color: "bg-[#00f5ff]", text: "Advanced React Patterns & Architecture" },
                  { color: "bg-[#a855f7]", text: "Node.js & RESTful API Design" },
                  { color: "bg-[#f59e0b]", text: "AI-Assisted Development Workflows" },
                ].map(({ color, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${color} blink`} />
                    <span className="text-sm text-[rgba(232,234,246,0.75)]">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[
              { label: "University", val: profile.university?.split(" ")[0] || "Air" },
              { label: "Location", val: profile.location || "Islamabad, PK" },
              { label: "Stack", val: "MERN" },
              { label: "Status", val: "Open to Work" },
            ].map(({ label, val }) => (
              <div key={label} className="glass rounded-md p-4">
                <div className="mono text-[0.62rem] tracking-[1.5px] text-[rgba(232,234,246,0.4)] uppercase mb-1">{label}</div>
                <div className="font-semibold text-sm text-[#00f5ff]">{val}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
