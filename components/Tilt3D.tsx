"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  max?: number;
};

export function Tilt3D({ children, className, max = 6 }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);
  const x = useSpring(xRaw, { stiffness: 200, damping: 18, mass: 0.6 });
  const y = useSpring(yRaw, { stiffness: 200, damping: 18, mass: 0.6 });

  const rotateX = useTransform(y, [-1, 1], [max, -max]);
  const rotateY = useTransform(x, [-1, 1], [-max, max]);

  function onMove(e: React.MouseEvent) {
    if (reduced) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    xRaw.set(px * 2);
    yRaw.set(py * 2);
  }

  function onLeave() {
    xRaw.set(0);
    yRaw.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          height: "100%",
          width: "100%",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
