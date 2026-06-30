import React from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "../../context/PortfolioContext";
import SectionLabel from "../ui/SectionLabel";
import { Award, ExternalLink } from "lucide-react";

export default function Certifications() {
  const { certifications = [] } = usePortfolio();

  return (
    <section id="certifications" className="section-pad px-8 md:px-20">
      <div className="max-w-6xl mx-auto">
        <SectionLabel number="06" label="Credentials" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="orbitron text-4xl font-bold text-gradient mb-3"
        >
          Certifications
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[rgba(232,234,246,0.5)] text-[0.95rem] mb-14 max-w-lg"
        >
          Documented verification of my technological competencies and courses.
        </motion.p>

        {certifications.length === 0 ? (
          <p className="mono text-xs text-white/40 text-center py-10">No verified credentials logged.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className="glass rounded-xl p-6 flex flex-col justify-between border border-white/5 bg-white/2 hover:border-[#00f5ff]/20 hover:shadow-[0_0_30px_rgba(0,245,255,0.05)] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#00f5ff]/10 border border-[#00f5ff]/20 flex items-center justify-center text-[#00f5ff]">
                    <Award className="w-5 h-5" />
                  </div>
                  {cert.credentialLink && (
                    <a
                      href={cert.credentialLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/40 hover:text-[#00f5ff] transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <div>
                  <h3 className="orbitron text-xs font-bold text-white mb-2 leading-relaxed uppercase">
                    {cert.title}
                  </h3>
                  <div className="flex justify-between items-center mt-3 border-t border-white/5 pt-3">
                    <span className="mono text-[9px] text-white/50 uppercase tracking-wider">{cert.issuer}</span>
                    <span className="mono text-[8px] text-[#00f5ff] font-bold uppercase">{cert.date}</span>
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
