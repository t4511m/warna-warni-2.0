"use client";

import {
  motion,
  useInView,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

type Stat = {
  value: number;
  plus?: boolean;
  label: string;
};

const STATS: readonly Stat[] = [
  { value: 50, plus: true, label: "Years" },
  { value: 6, label: "Cities" },
  { value: 1000, plus: true, label: "Locations" },
  { value: 500, plus: true, label: "Clients" },
] as const;

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <section
      ref={ref}
      aria-label="By the numbers"
      className="relative bg-ink text-paper"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(60% 60% at 50% 0%, rgb(232 50 10 / 0.18), transparent 70%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-4 py-16 md:grid-cols-4 md:gap-x-6 md:px-10 md:py-20 lg:px-16">
        {STATS.map((s, i) => (
          <Counter key={s.label} stat={s} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}

function Counter({
  stat,
  index,
  inView,
}: {
  stat: Stat;
  index: number;
  inView: boolean;
}) {
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 22,
    mass: 1,
    restDelta: 0.5,
  });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => spring.set(stat.value), index * 120);
    return () => clearTimeout(t);
  }, [inView, spring, stat.value, index]);

  return (
    <div className="relative flex flex-col gap-2 md:border-l md:border-paper/10 md:pl-6 md:first:border-l-0 md:first:pl-0">
      <div className="flex items-baseline gap-1 font-display leading-none">
        <motion.span
          className="text-5xl tracking-[-0.02em] md:text-6xl lg:text-7xl"
          style={{ fontWeight: 700 }}
        >
          {display}
        </motion.span>
        {stat.plus && (
          <span className="text-3xl text-accent md:text-4xl">+</span>
        )}
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-paper/60">
        {stat.label}
      </p>
    </div>
  );
}
