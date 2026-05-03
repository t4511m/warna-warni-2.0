"use client";

import { animated, useSpring } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

type Props = {
  className?: string;
  delay?: number;
};

export function AnimatedDivider({ className = "", delay = 0 }: Props) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -10% 0px",
  });

  const styles = useSpring({
    transform: inView ? "scaleX(1)" : "scaleX(0)",
    config: { tension: 50, friction: 18, mass: 1 },
    delay,
  });

  return (
    <animated.span
      ref={ref}
      aria-hidden
      className={`block h-px w-full origin-left bg-ink/15 ${className}`}
      style={styles}
    />
  );
}
