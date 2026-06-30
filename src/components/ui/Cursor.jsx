import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const ringX = useSpring(dotX, { damping: 18, stiffness: 200 });
  const ringY = useSpring(dotY, { damping: 18, stiffness: 200 });
  const isHovering = useRef(false);

  useEffect(() => {
    const move = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };
    const onEnter = () => { isHovering.current = true; };
    const onLeave = () => { isHovering.current = false; };

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [role=button]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => window.removeEventListener("mousemove", move);
  }, [dotX, dotY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          background: "var(--cyan)",
          mixBlendMode: "screen",
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1px solid rgba(0,245,255,0.4)",
        }}
      />
    </>
  );
}
