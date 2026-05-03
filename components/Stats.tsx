"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";

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
      className="bg-mist text-ink"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-12">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              By the numbers
            </p>
            <h2
              className="mt-4 font-semibold tracking-[-0.025em] text-ink"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.75rem)",
                lineHeight: 1.05,
                fontWeight: 700,
              }}
            >
              Trusted scale, proven reach.
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-y-12 md:mt-20 md:grid-cols-4 md:gap-x-6">
          {STATS.map((s, i) => (
            <Counter key={s.label} stat={s} index={i} inView={inView} />
          ))}
        </div>
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
    <div className="flex flex-col items-center text-center">
      <div className="flex items-baseline gap-1 leading-none">
        <motion.span
          className="font-semibold tracking-[-0.03em] text-ink"
          style={{
            fontSize: "clamp(2.75rem, 6vw, 4.5rem)",
            fontVariantNumeric: "tabular-nums",
            fontWeight: 700,
          }}
        >
          {display}
        </motion.span>
        {stat.plus && (
          <span className="text-3xl font-medium text-accent md:text-4xl">
            +
          </span>
        )}
      </div>
      <p className="mt-4 text-sm font-medium text-muted md:text-base">
        {stat.label}
      </p>
    </div>
  );
}
