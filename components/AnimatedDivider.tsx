"use client";

import { animated, useSpring } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

type Props = {
  className?: string;
  delay?: number;
  label?: string;
  index?: string;
};

/**
 * Editorial section rule with optional label + index — used between sections.
 * Variant 1 (no label): a hairline that draws in.
 * Variant 2 (label):    "— №01" left, "INVENTORY" right, hairline between.
 */
export function AnimatedDivider({
  className = "",
  delay = 0,
  label,
  index,
}: Props) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -10% 0px",
  });

  const styles = useSpring({
    transform: inView ? "scaleX(1)" : "scaleX(0)",
    config: { tension: 50, friction: 18, mass: 1 },
    delay,
  });

  if (!label && !index) {
    return (
      <animated.span
        ref={ref}
        aria-hidden
        className={`block h-px w-full origin-left bg-carbon/20 ${className}`}
        style={styles}
      />
    );
  }

  return (
    <div
      ref={ref}
      className={`flex items-center gap-4 ${className}`}
      aria-hidden
    >
      {index && (
        <span
          className="font-mono text-[10px] uppercase tracking-[0.24em]"
          style={{ color: "var(--color-cinnabar)" }}
        >
          — №{index}
        </span>
      )}
      <animated.span
        className="block h-px flex-1 origin-left"
        style={{ ...styles, backgroundColor: "var(--color-carbon)" }}
      />
      {label && (
        <span
          className="font-mono text-[10px] uppercase tracking-[0.24em]"
          style={{ color: "var(--color-carbon)" }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
