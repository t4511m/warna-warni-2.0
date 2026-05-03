"use client";

import { motion, useReducedMotion } from "framer-motion";

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
};

export function Stagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.1,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

const itemVariantsFull = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 18,
      mass: 0.8,
    },
  },
};

const itemVariantsReduced = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 18,
      mass: 0.8,
    },
  },
};

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function StaggerItem({ children, className, style }: StaggerItemProps) {
  const reduced = useReducedMotion();
  const variants = reduced ? itemVariantsReduced : itemVariantsFull;
  return (
    <motion.div className={className} style={style} variants={variants}>
      {children}
    </motion.div>
  );
}
