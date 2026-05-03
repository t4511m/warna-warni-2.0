"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { HeroHeadline } from "@/components/HeroHeadline";
import { MagneticButton } from "@/components/MagneticButton";
import { Reveal } from "@/components/Reveal";

export function HeroMain() {
  return (
    <section className="relative flex min-h-screen items-center overflow-x-clip bg-paper text-ink">
      <MouseGradient />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-32 text-center md:px-10 md:py-40">
        <HeroHeadline />

        <Reveal delay={0.55} y={16}>
          <p className="mx-auto mt-8 max-w-xl pb-1 text-base text-muted md:text-xl md:leading-relaxed">
            From Jakarta skylines to Bali beachfronts — billboards, videotrons,
            neonbox, and pedestrian bridges, all in one network.
          </p>
        </Reveal>

        <Reveal delay={0.75} y={16}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton pull={0.35} className="inline-block">
              <a
                href="#inventory"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-base font-medium text-paper hover:scale-[1.04]"
                style={{
                  transition:
                    "transform var(--duration-base) var(--ease-out-quint)",
                }}
              >
                Explore inventory
              </a>
            </MagneticButton>

            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-medium text-ink hover:text-accent"
              style={{
                transition:
                  "color var(--duration-fast) var(--ease-out-quint)",
              }}
            >
              Talk to us
              <span
                aria-hidden
                className="inline-block group-hover:translate-x-1"
                style={{
                  transition:
                    "transform var(--duration-fast) var(--ease-out-quint)",
                }}
              >
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MouseGradient() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(50);
  const my = useMotionValue(35);
  const sx = useSpring(mx, { stiffness: 30, damping: 25, mass: 1 });
  const sy = useSpring(my, { stiffness: 30, damping: 25, mass: 1 });

  const bg = useTransform([sx, sy], (latest) => {
    const [x, y] = latest as [number, number];
    return `radial-gradient(60% 50% at ${x}% ${y}%, rgb(232 50 10 / 0.08), transparent 70%), radial-gradient(70% 60% at 50% 100%, rgb(245 245 247) 0%, rgba(245,245,247,0) 70%)`;
  });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 100);
      my.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduced]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ backgroundImage: bg }}
    />
  );
}
