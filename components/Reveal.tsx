"use client";

import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: RevealProps) {
  const reduced = useReducedMotion();
  const initial = reduced ? { opacity: 0 } : { opacity: 0, y };
  const target = reduced ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={target}
      viewport={{ once: true, margin: "-15%" }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 18,
        mass: 0.8,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
