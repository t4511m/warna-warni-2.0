"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<"idle" | "interactive" | "media">(
    "idle",
  );

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });

  // Lagging halo for the magnetic ring
  const rx = useSpring(x, { stiffness: 90, damping: 18, mass: 0.7 });
  const ry = useSpring(y, { stiffness: 90, damping: 18, mass: 0.7 });

  const haloScale = useTransform(() =>
    variant === "interactive" ? 2.4 : variant === "media" ? 4.2 : 1,
  );
  const dotScale = useTransform(() =>
    variant === "interactive" ? 0.0 : variant === "media" ? 0 : 1,
  );

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
      if (t.closest('[data-cursor="media"]')) {
        setVariant("media");
        return;
      }
      const interactive = t.closest(
        'a, button, [role="button"], input, select, textarea, [data-cursor="grow"]',
      );
      setVariant(interactive ? "interactive" : "idle");
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Dot — sharp, fast */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        style={{
          x: sx,
          y: sy,
          scale: dotScale,
          backgroundColor: "var(--color-carbon)",
          mixBlendMode: "difference",
        }}
      />
      {/* Halo — lagging, color-shifting */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        style={{
          x: rx,
          y: ry,
          scale: haloScale,
          border: "1px solid var(--color-carbon)",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
