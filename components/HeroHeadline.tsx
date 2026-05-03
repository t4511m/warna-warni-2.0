"use client";

import { motion, type Variants } from "framer-motion";

const LINE_1 = ["Your", "message,"];
const LINE_2 = ["Everywhere."];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 18, mass: 0.8 },
  },
};

export function HeroHeadline() {
  return (
    <motion.h1
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="font-sans text-ink"
      style={{
        fontWeight: 700,
        fontSize: "clamp(2.75rem, 8vw, 6.5rem)",
        lineHeight: 1.04,
        letterSpacing: "-0.03em",
      }}
    >
      <span className="sr-only">Your message, Everywhere.</span>
      <span aria-hidden className="block">
        {LINE_1.map((word, i) => (
          <motion.span
            key={`l1-${i}`}
            variants={wordVariants}
            className="inline-block"
          >
            {word}
            {i < LINE_1.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </span>
      <span aria-hidden className="block">
        {LINE_2.map((word, i) => (
          <motion.span
            key={`l2-${i}`}
            variants={wordVariants}
            className="inline-block text-accent"
          >
            {word}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  );
}
