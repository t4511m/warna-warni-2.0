"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(1);
  const sx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });
  const sScale = useSpring(scale, { stiffness: 200, damping: 20 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        'a, button, [role="button"], input, select, textarea, [data-cursor="grow"]',
      );
      scale.set(interactive ? 2.6 : 1);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y, scale]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink mix-blend-difference md:block"
      style={{ x: sx, y: sy, scale: sScale }}
    />
  );
}
