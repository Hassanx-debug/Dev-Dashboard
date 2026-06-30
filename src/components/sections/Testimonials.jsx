import React from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "../../context/PortfolioContext";
import SectionLabel from "../ui/SectionLabel";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const { testimonials = [] } = usePortfolio();

  return (
    <section id="testimonials" className="section-pad px-8 md:px-20 bg-gradient-to-b from-transparent via-[rgba(168,85,247,0.01)] to-transparent">
      <div className="max-w-6xl mx-auto">
        <SectionLabel number="08" label="Endorsements" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="orbitron text-4xl font-bold text-gradient mb-3"
        >
          Recommendations
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[rgba(232,234,246,0.5)] text-[0.95rem] mb-14 max-w-lg"
        >
          Words of feedback from peers, project stakeholders, and supervisors.
        </motion.p>

        {testimonials.length === 0 ? (
          <p className="mono text-xs text-white/40 text-center py-10">No recommendations logged.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((test, i) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-xl p-8 relative overflow-hidden flex flex-col justify-between border border-white/5 bg-white/2"
              >
                {/* Accent quote */}
                <Quote className="absolute right-6 top-6 w-20 h-20 text-white/[0.02] pointer-events-none select-none" />

                <p className="text-white/80 text-sm leading-relaxed mb-6 italic relative z-10">
                  "{test.quote}"
                </p>

                <div className="flex items-center gap-4 relative z-10 border-t border-white/5 pt-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-[#00f5ff]/10 border border-[#00f5ff]/20 flex items-center justify-center text-[#00f5ff] font-bold select-none text-xs">
                    {test.authorName?.charAt(0) || "U"}
                  </div>
                  <div>
                    <h4 className="orbitron font-bold text-white text-xs uppercase tracking-wide">
                      {test.authorName}
                    </h4>
                    <span className="mono text-[9px] text-white/40 uppercase tracking-wider block mt-0.5">
                      {test.authorRole}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
