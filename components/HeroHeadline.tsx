"use client";

import { motion, type Variants } from "framer-motion";

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.022, delayChildren: 0.08 },
  },
};

const charVariants: Variants = {
  hidden: { opacity: 0, y: "0.6em" },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_QUINT },
  },
};

function chars(text: string, prefix: string, className?: string) {
  return text.split("").map((c, i) => (
    <motion.span
      key={`${prefix}-${i}`}
      className={`inline-block ${className ?? ""}`}
      variants={charVariants}
    >
      {c === " " ? " " : c}
    </motion.span>
  ));
}

export function HeroHeadline() {
  return (
    <motion.h1
      className="mt-6 font-display leading-[0.92] tracking-[-0.02em] text-paper"
      style={{
        fontWeight: 900,
        fontSize: "clamp(3.5rem, 8vw, 7rem)",
      }}
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <span className="sr-only">Your message, Everywhere.</span>
      <span aria-hidden>
        {chars("Your message,", "a")}
        <br />
        {chars("Everywhere", "b", "italic text-accent")}
        {chars(".", "c", "text-accent")}
      </span>
    </motion.h1>
  );
}
