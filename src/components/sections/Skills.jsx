import React from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "../../context/PortfolioContext";
import SectionLabel from "../ui/SectionLabel";

const colorMap = {
  cyan: { border: "rgba(0,245,255,0.25)", glow: "rgba(0,245,255,0.05)", pill: "rgba(0,245,255,0.06)", pillBorder: "rgba(0,245,255,0.15)", text: "var(--cyan)" },
  purple: { border: "rgba(179,71,234,0.25)", glow: "rgba(179,71,234,0.05)", pill: "rgba(179,71,234,0.06)", pillBorder: "rgba(179,71,234,0.15)", text: "var(--purple)" },
  gold: { border: "rgba(255,215,0,0.25)", glow: "rgba(255,215,0,0.05)", pill: "rgba(255,215,0,0.06)", pillBorder: "rgba(255,215,0,0.15)", text: "var(--gold)" },
};

export default function Skills() {
  const { skills = [] } = usePortfolio();

  return (
    <section id="skills" className="section-pad px-8 md:px-20">
      <div className="max-w-6xl mx-auto">
        <SectionLabel number="02" label="Arsenal" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="orbitron text-4xl font-bold text-gradient mb-3"
        >
          Tech Stack
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[rgba(232,234,246,0.5)] text-[0.95rem] mb-14 max-w-lg"
        >
          Every tool selected for a reason. Every skill sharpened for production.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((cluster, ci) => {
            const c = colorMap[cluster.color] || colorMap.cyan;
            return (
              <motion.div
                key={cluster.id || cluster.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="glass rounded-md p-6 relative overflow-hidden group"
                style={{ borderColor: c.border }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${c.glow}, transparent 70%)` }}
                />
                <div className="relative z-10">
                  <div className="text-3xl mb-3">{cluster.icon}</div>
                  <div className="mono text-[0.68rem] tracking-[2px] uppercase mb-4" style={{ color: c.text }}>
                    {cluster.category}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cluster.items.map((item) => (
                      <motion.span
                        key={item}
                        whileHover={{ scale: 1.08 }}
                        className="mono text-[0.7rem] px-3 py-1.5 rounded-sm text-[rgba(232,234,246,0.8)] transition-all duration-200"
                        style={{
                          background: c.pill,
                          border: `1px solid ${c.pillBorder}`,
                        }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
