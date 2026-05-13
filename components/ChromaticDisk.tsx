"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

/**
 * The signature visual of the redesign — a slowly rotating chromatic
 * disk made of overlapping color slices, with a parallactic eye that
 * tracks the mouse. Pure SVG, no images.
 */
export function ChromaticDisk({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 80, damping: 20, mass: 0.8 });
  const eyeX = useTransform(sx, (v) => v * 6);
  const eyeY = useTransform(sy, (v) => v * 6);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduced]);

  return (
    <div
      className={`relative aspect-square w-full max-w-[640px] ${className}`}
      aria-hidden
    >
      {/* Slow rotation layer */}
      <motion.div
        className="absolute inset-0"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <defs>
            <clipPath id="disk-clip">
              <circle cx="200" cy="200" r="196" />
            </clipPath>
          </defs>
          <g clipPath="url(#disk-clip)">
            <rect x="0" y="0" width="100" height="400" fill="#F25D27" />
            <rect x="100" y="0" width="100" height="400" fill="#1B3FAB" />
            <rect x="200" y="0" width="100" height="400" fill="#1F6E55" />
            <rect x="300" y="0" width="100" height="400" fill="#D63384" />
            {/* Diagonal stripe overlay */}
            <g
              style={{
                mixBlendMode: "multiply",
                opacity: 0.85,
              }}
            >
              <polygon points="0,400 400,0 400,80 80,400" fill="#0A0A0A" />
            </g>
            {/* Cream serif "W" massive watermark */}
            <text
              x="200"
              y="262"
              textAnchor="middle"
              fontSize="320"
              fontFamily="var(--font-display), serif"
              fontWeight="200"
              fill="#F4EFE6"
              style={{
                fontStyle: "italic",
                fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
                mixBlendMode: "screen",
                opacity: 0.92,
              }}
            >
              W
            </text>
          </g>
          <circle
            cx="200"
            cy="200"
            r="196"
            fill="none"
            stroke="#0A0A0A"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* Outer rotating mono ring (counter-rotating) */}
      <motion.div
        className="absolute inset-[-6%]"
        animate={reduced ? undefined : { rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 500 500" className="h-full w-full">
          <defs>
            <path
              id="ring-path"
              d="M 250,250 m -210,0 a 210,210 0 1,1 420,0 a 210,210 0 1,1 -420,0"
              fill="none"
            />
          </defs>
          <text
            fontFamily="var(--font-mono), monospace"
            fontSize="14"
            fill="#0A0A0A"
            letterSpacing="6"
            style={{ textTransform: "uppercase" }}
          >
            <textPath href="#ring-path">
              {" WARNA · WARNI · OUT-OF-HOME · INDONESIA · 1972 · WARNA · WARNI · NETWORK · ENAM · KOTA · ".repeat(
                2,
              )}
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Eye that tracks mouse */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: eyeX,
          y: eyeY,
          backgroundColor: "var(--color-carbon)",
          boxShadow:
            "0 0 0 8px var(--color-kapur), 0 0 0 9px var(--color-carbon), 0 0 24px rgba(10,10,10,0.25)",
        }}
      />
    </div>
  );
}
