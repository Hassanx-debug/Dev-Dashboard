import React from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "../../context/PortfolioContext";
import SectionLabel from "../ui/SectionLabel";
import { Briefcase, Calendar } from "lucide-react";

export default function Experience() {
  const { experience = [] } = usePortfolio();

  const sortedExp = [...experience].sort((a, b) => a.order - b.order);

  return (
    <section id="experience" className="section-pad px-8 md:px-20 relative">
      <div className="max-w-4xl mx-auto">
        <SectionLabel number="05" label="Timeline" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="orbitron text-4xl font-bold text-gradient mb-3"
        >
          Work History
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[rgba(232,234,246,0.5)] text-[0.95rem] mb-16 max-w-lg"
        >
          A chronicle of my professional journeys, building real-world digital ecosystems.
        </motion.p>

        {sortedExp.length === 0 ? (
          <p className="mono text-xs text-white/40 text-center py-10">No professional timelines registered.</p>
        ) : (
          <div className="relative border-l border-white/10 pl-6 sm:pl-8 ml-4 flex flex-col gap-12">
            {sortedExp.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative group animate-pulse-slow"
              >
                {/* Node bubble */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-[#030712] border border-white/10 flex items-center justify-center text-[#00f5ff] group-hover:border-[#00f5ff] group-hover:shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all z-10">
                  <Briefcase className="w-2.5 h-2.5" />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 flex-wrap text-[#00f5ff] font-bold">
                    <span className="orbitron text-base tracking-wide uppercase">{exp.role}</span>
                    <span className="text-white/40 text-xs">—</span>
                    <span className="mono text-xs text-white/70 uppercase tracking-widest">{exp.company}</span>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap text-white/40 mono text-[9px] uppercase tracking-wider mb-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-2.5 h-2.5" />
                      <span>{exp.startDate} - {exp.endDate}</span>
                    </div>
                    {exp.period && (
                      <span className="text-[#00f5ff] text-[8px] border border-[#00f5ff]/20 px-2 py-0.5 rounded">
                        {exp.period}
                      </span>
                    )}
                    {exp.location && (
                      <span className="text-white/60">
                        · {exp.location}
                      </span>
                    )}
                  </div>

                  <p className="text-[rgba(232,234,246,0.6)] text-sm leading-relaxed max-w-2xl">
                    {exp.description}
                  </p>

                  {exp.techUsed && exp.techUsed.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {exp.techUsed.map((tech) => (
                        <span
                          key={tech}
                          className="mono text-[8px] bg-[#00f5ff]/5 border border-[#00f5ff]/15 text-[#00f5ff] px-2 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
