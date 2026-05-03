"use client";

import { animated, useSpring } from "@react-spring/web";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  pull?: number;
};

export function MagneticButton({ children, className, pull = 0.3 }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [styles, api] = useSpring(
    () => ({
      x: 0,
      y: 0,
      config: { tension: 220, friction: 18, mass: 0.6 },
    }),
    [],
  );

  function onMove(e: React.MouseEvent) {
    if (reduced) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    api.start({
      x: (e.clientX - cx) * pull,
      y: (e.clientY - cy) * pull,
    });
  }

  function onLeave() {
    api.start({ x: 0, y: 0 });
  }

  return (
    <animated.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={styles}
    >
      {children}
    </animated.div>
  );
}
