"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.18 },
  },
};

const lineVariants: Variants = {
  hidden: { y: "112%" },
  show: {
    y: "0%",
    transition: { type: "spring", stiffness: 60, damping: 16, mass: 0.95 },
  },
};

const reducedLine: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.45 } },
};

/**
 * Editorial display headline:
 *   YOUR MESSAGE,        (sans · big · carbon)
 *   in living color.     (italic serif · cinnabar)
 *   Everywhere.          (sans · big · carbon)
 */
export function HeroHeadline() {
  const reduced = useReducedMotion();
  const v = reduced ? reducedLine : lineVariants;

  return (
    <motion.h1
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="text-carbon"
      style={{
        fontFamily: "var(--font-display)",
        fontVariationSettings: '"opsz" 144, "SOFT" 100',
        fontSize: "clamp(3.25rem, 11vw, 9rem)",
        lineHeight: 0.95,
        letterSpacing: "-0.045em",
        fontWeight: 300,
      }}
    >
      <span className="sr-only">
        Your message, in living color, everywhere.
      </span>
      <Line>
        <motion.span variants={v} className="block">
          Your message,
        </motion.span>
      </Line>
      <Line>
        <motion.span
          variants={v}
          className="block text-cinnabar"
          style={{
            fontStyle: "italic",
            fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
          }}
        >
          in living color
        </motion.span>
      </Line>
      <Line>
        <motion.span variants={v} className="block">
          everywhere<span className="text-cinnabar">.</span>
        </motion.span>
      </Line>
    </motion.h1>
  );
}

function Line({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden
      className="block overflow-hidden"
      style={{ paddingBottom: "0.18em", marginBottom: "-0.14em" }}
    >
      {children}
    </span>
  );
}
