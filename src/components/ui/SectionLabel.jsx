import { motion } from "framer-motion";

export default function SectionLabel({ number, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mono text-[0.7rem] text-cyan tracking-[4px] uppercase mb-4 flex items-center gap-3"
    >
      {number && <span className="opacity-50">{number} —</span>}
      {label}
      <span className="flex-1 h-px bg-[rgba(0,245,255,0.15)] max-w-[100px]" />
    </motion.div>
  );
}
