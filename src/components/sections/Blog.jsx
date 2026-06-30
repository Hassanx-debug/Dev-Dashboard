import React from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "../../context/PortfolioContext";
import SectionLabel from "../ui/SectionLabel";
import { BookOpen, ArrowUpRight } from "lucide-react";

export default function Blog() {
  const { blog = [] } = usePortfolio();

  return (
    <section id="blog" className="section-pad px-8 md:px-20">
      <div className="max-w-6xl mx-auto">
        <SectionLabel number="07" label="Writings" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="orbitron text-4xl font-bold text-gradient mb-3"
        >
          Articles
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[rgba(232,234,246,0.5)] text-[0.95rem] mb-14 max-w-lg"
        >
          Thoughts, technical deep dives, and tutorials sharing developer perspectives.
        </motion.p>

        {blog.length === 0 ? (
          <p className="mono text-xs text-white/40 text-center py-10">No publications registered.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {blog.map((post, i) => (
              <motion.a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass rounded-xl p-6 flex flex-col justify-between border border-white/5 bg-white/2 hover:border-[#00f5ff]/20 hover:shadow-[0_0_35px_rgba(0,245,255,0.04)] transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-9 h-9 rounded bg-[#a855f7]/10 border border-[#a855f7]/20 flex items-center justify-center text-[#a855f7] flex-shrink-0">
                    <BookOpen className="w-4.5 h-4.5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#00f5ff] transition-all" />
                </div>

                <div>
                  <h3 className="orbitron font-bold text-white text-sm mb-2 group-hover:text-[#00f5ff] transition-colors line-clamp-1 uppercase">
                    {post.title}
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-white/40 mono text-[9px] uppercase tracking-wider">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
