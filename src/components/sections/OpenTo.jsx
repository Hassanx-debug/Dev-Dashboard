import React from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "../../context/PortfolioContext";
import SectionLabel from "../ui/SectionLabel";

export default function OpenTo() {
  const { openTo = [] } = usePortfolio();

  return (
    <section className="section-pad px-8 md:px-20 bg-gradient-to-b from-transparent via-[rgba(0,245,255,0.01)] to-transparent">
      <div className="max-w-6xl mx-auto">
        <SectionLabel number="05" label="Availability" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="orbitron text-4xl font-bold text-gradient mb-3"
        >
          Open To
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[rgba(232,234,246,0.5)] text-[0.95rem] mb-14 max-w-lg"
        >
          Ready to contribute, learn, and grow. Let's build something meaningful.
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-4">
          {openTo.map((item, i) => (
            <motion.div
              key={item.id || item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ x: 6, transition: { duration: 0.2 } }}
              className="glass rounded-md p-6 flex items-center gap-5 group border border-white/5 bg-white/2"
            >
              <div
                className="w-14 h-14 rounded flex items-center justify-center text-2xl flex-shrink-0 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(0,245,255,0.08), rgba(179,71,234,0.08))",
                  border: "1px solid rgba(0,245,255,0.15)",
                }}
              >
                {item.icon}
              </div>
              <div>
                <div className="font-semibold text-white mb-1">{item.title}</div>
                <div className="text-[rgba(232,234,246,0.5)] text-sm leading-relaxed">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
