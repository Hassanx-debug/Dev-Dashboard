import React from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "../../context/PortfolioContext";
import SectionLabel from "../ui/SectionLabel";

export default function Services() {
  const { services = [] } = usePortfolio();

  return (
    <section id="services" className="section-pad px-8 md:px-20">
      <div className="max-w-6xl mx-auto">
        <SectionLabel number="04" label="Services" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="orbitron text-4xl font-bold text-gradient mb-3"
        >
          What I Build
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[rgba(232,234,246,0.5)] text-[0.95rem] mb-14 max-w-lg"
        >
          End-to-end solutions from pixel to production. Delivered with precision.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <motion.div
              key={svc.id || svc.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass rounded-md p-7 group relative overflow-hidden border border-white/5"
            >
              {/* Bottom line reveal */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#a855f7] to-[#00f5ff] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

              <div
                className="orbitron text-5xl font-black leading-none mb-6 transition-colors duration-300 select-none"
                style={{ color: "rgba(0,245,255,0.07)" }}
              >
                {svc.num}
              </div>
              <h3 className="font-semibold text-white text-base mb-3">{svc.title}</h3>
              <p className="text-[rgba(232,234,246,0.5)] text-sm leading-relaxed">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
