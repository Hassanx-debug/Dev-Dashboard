import React from "react";
import { motion } from "framer-motion";
import { Link, GitBranch, Mail, ArrowUpRight, Phone } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import SectionLabel from "../ui/SectionLabel";

export default function Contact() {
  const { profile = {} } = usePortfolio();

  const links = [
    { icon: Link, label: "LinkedIn", sub: "Connect professionally", href: profile.linkedin, color: "rgba(0,119,181,0.15)" },
    { icon: GitBranch, label: "GitHub", sub: "See my code", href: profile.github || `https://github.com/${profile.githubUsername}`, color: "rgba(255,255,255,0.05)" },
    { icon: Mail, label: "Email", sub: "Say hello", href: `mailto:${profile.email || "hassanair5858@gmail.com"}`, color: "rgba(0,245,255,0.08)" },
    { icon: Phone, label: "Phone", sub: "Call directly", href: `tel:${profile.phone || "+923335909273"}`, color: "rgba(168,85,247,0.15)" },
  ];

  return (
    <section id="contact" className="section-pad px-8 md:px-20 bg-gradient-to-b from-transparent to-[rgba(179,71,234,0.04)]">
      <div className="max-w-3xl mx-auto text-center">
        <SectionLabel number="06" label="Contact" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="orbitron text-4xl font-bold text-gradient mb-5"
        >
          Let's Connect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[rgba(232,234,246,0.55)] leading-relaxed mb-14 text-[0.97rem]"
        >
          Whether you have a project in mind, an opportunity to share, or just want to connect with a passionate developer — I'm always ready to have that conversation.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map(({ icon: Icon, label, sub, href, color }, i) => (
            <motion.a
              key={label}
              href={href}
              target={label === "Phone" ? undefined : "_blank"}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
              className="flex items-center gap-4 px-6 py-5 glass rounded-md group transition-all duration-300 hover:border-[rgba(0,245,255,0.35)] hover:shadow-[0_10px_30px_rgba(0,245,255,0.08)] border border-white/5 relative overflow-hidden"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,245,255,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0 relative z-10 group-hover:scale-110"
                style={{ background: color, border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <Icon className="w-5 h-5 text-[#00f5ff]" />
              </div>
              <div className="text-left relative z-10">
                <div className="font-semibold text-white text-sm group-hover:text-[#00f5ff] transition-colors duration-300">{label}</div>
                <div className="mono text-[0.65rem] tracking-[1px] text-[rgba(232,234,246,0.4)] group-hover:text-[rgba(232,234,246,0.6)] transition-colors duration-300">{sub}</div>
              </div>
              <ArrowUpRight className="w-4 h-4 ml-auto text-[rgba(0,245,255,0.3)] group-hover:text-[#00f5ff] group-hover:scale-110 transition-all duration-300 relative z-10" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
