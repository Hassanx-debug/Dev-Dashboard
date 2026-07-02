import React from "react";
import { motion } from "framer-motion";
import { Download, FileText, ExternalLink, Eye } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import SectionLabel from "../ui/SectionLabel";

export default function Resume() {
  const { profile = {} } = usePortfolio();
  const resumeBase64 = profile.resumeBase64;
  
  // Use uploaded resume (base64) if available, otherwise fall back to public file
  const resumeUrl = resumeBase64 || "/Hassan_BinNisar_Resume.pdf";
  const hasUploadedResume = !!resumeBase64;

  const handleDownload = () => {
    if (hasUploadedResume) {
      // For base64 data URL, convert to blob and download
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = "Hassan_BinNisar_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // For public file, use simple download
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = "Hassan_BinNisar_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleView = () => {
    window.open(resumeUrl, "_blank");
  };

  return (
    <section id="resume" className="section-pad px-8 md:px-20 bg-gradient-to-b from-transparent via-[rgba(179,71,234,0.02)] to-transparent">
      <div className="max-w-4xl mx-auto">
        <SectionLabel number="07" label="Resume" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="orbitron text-4xl font-bold text-gradient mb-5"
        >
          My Resume
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[rgba(232,234,246,0.55)] leading-relaxed mb-12 text-[0.97rem] max-w-2xl"
        >
          Download or view my complete resume to learn more about my experience, skills, and qualifications. 
          Feel free to reach out if you'd like to discuss potential opportunities.
        </motion.p>

        {true ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-8 border border-[#00f5ff]/20 bg-white/2 relative overflow-hidden"
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl opacity-100 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(0,245,255,0.15), transparent 40%, transparent 60%, rgba(168,85,247,0.15))",
                padding: "1px",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude"
              }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              {/* Icon */}
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#00f5ff]/20 to-[#a855f7]/20 border border-[#00f5ff]/30 flex items-center justify-center flex-shrink-0">
                <FileText className="w-10 h-10 text-[#00f5ff]" />
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="orbitron text-xl font-bold text-white mb-2">
                  Hassan_BinNisar_Resume.pdf
                </h3>
                <p className="text-[rgba(232,234,246,0.5)] text-sm mb-1">
                  Full Stack Developer Resume
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-[rgba(232,234,246,0.4)] text-xs mono">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Available for download
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleView}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-[#00f5ff]/30 text-[#00f5ff] rounded-lg hover:bg-[#00f5ff]/10 transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span className="mono text-xs font-bold tracking-wider uppercase">View</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00f5ff]/20 to-[#a855f7]/20 border border-[#00f5ff]/40 text-white rounded-lg hover:from-[#00f5ff]/30 hover:to-[#a855f7]/30 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span className="mono text-xs font-bold tracking-wider uppercase">Download</span>
                </motion.button>
              </div>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00f5ff] to-[#a855f7] opacity-50" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-12 border border-white/5 bg-white/2 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/30 mx-auto mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="orbitron text-lg font-bold text-white mb-2">
              Resume Coming Soon
            </h3>
            <p className="text-[rgba(232,234,246,0.5)] text-sm max-w-md mx-auto">
              The resume is being updated. Please check back later or contact me directly for more information.
            </p>
          </motion.div>
        )}

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="glass rounded-lg p-4 border border-white/5 bg-white/2 text-center">
            <div className="text-[#00f5ff] text-2xl mb-1">📄</div>
            <div className="mono text-xs text-white/70">PDF Format</div>
          </div>
          <div className="glass rounded-lg p-4 border border-white/5 bg-white/2 text-center">
            <div className="text-[#a855f7] text-2xl mb-1">⚡</div>
            <div className="mono text-xs text-white/70">Instant Access</div>
          </div>
          <div className="glass rounded-lg p-4 border border-white/5 bg-white/2 text-center">
            <div className="text-[#f59e0b] text-2xl mb-1">🔒</div>
            <div className="mono text-xs text-white/70">Secure & Private</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}