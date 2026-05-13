"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { AnimatedDivider } from "@/components/AnimatedDivider";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
  caption: string;
  color: string;
};

const STATS: readonly Stat[] = [
  {
    value: 50,
    suffix: "+",
    label: "Years",
    caption: "Operating since 1972",
    color: "var(--color-cinnabar)",
  },
  {
    value: 6,
    label: "Cities",
    caption: "Java · Bali · Sumatera · Sulawesi",
    color: "var(--color-ultramarine)",
  },
  {
    value: 1000,
    suffix: "+",
    label: "Locations",
    caption: "Live, audited, permitted",
    color: "var(--color-jade)",
  },
  {
    value: 500,
    suffix: "+",
    label: "Clients",
    caption: "From local SMEs to FMCG giants",
    color: "var(--color-magenta)",
  },
] as const;

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <section
      ref={ref}
      aria-label="By the numbers"
      style={{
        backgroundColor: "var(--color-carbon)",
        color: "var(--color-kapur)",
      }}
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-8 md:py-32">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10"
                style={{ backgroundColor: "var(--color-cinnabar)" }}
              />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.28em]"
                style={{ color: "var(--color-cinnabar)" }}
              >
                №02 — By the numbers
              </span>
            </div>
            <h2
              className="mt-8 font-display tracking-[-0.035em]"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                lineHeight: 1,
                fontWeight: 300,
                fontVariationSettings: '"opsz" 144, "SOFT" 100',
              }}
            >
              Trusted{" "}
              <span
                className="text-cinnabar"
                style={{
                  fontStyle: "italic",
                  fontVariationSettings:
                    '"opsz" 144, "SOFT" 100, "WONK" 1',
                }}
              >
                scale,
              </span>
              <br />
              proven reach.
            </h2>
            <p
              className="mt-6 max-w-sm text-base leading-relaxed"
              style={{ color: "rgba(244,239,230,0.65)" }}
            >
              Half a century in the field. The numbers are audited, the permits
              are real, the inventory ships.
            </p>
          </div>

          <div className="md:col-span-8">
            <div className="grid grid-cols-2 gap-px md:grid-cols-2">
              {STATS.map((s, i) => (
                <Counter key={s.label} stat={s} index={i} inView={inView} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-24">
          <AnimatedDivider label="Continue" index="03" />
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
  const reduced = useReducedMotion();
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 22,
    mass: 1,
    restDelta: 0.5,
  });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString("en-US"));

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => spring.set(stat.value), index * 140);
    return () => clearTimeout(t);
  }, [inView, spring, stat.value, index]);

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden p-8 md:p-10"
      style={{
        backgroundColor: "rgba(244,239,230,0.02)",
        outline: "1px solid rgba(244,239,230,0.08)",
      }}
    >
      <div
        className="absolute left-0 top-0 h-1 w-full origin-left"
        style={{
          backgroundColor: stat.color,
          transform: inView ? "scaleX(1)" : "scaleX(0)",
          transition: `transform 1.4s cubic-bezier(0.22,1,0.36,1) ${index * 0.18 + 0.2}s`,
        }}
      />

      <div className="flex items-baseline gap-2">
        <motion.span
          className="font-display tabular-nums tracking-[-0.04em]"
          style={{
            fontSize: "clamp(3.5rem, 8vw, 6rem)",
            lineHeight: 1,
            color: "var(--color-kapur)",
            fontWeight: 300,
            fontVariationSettings: '"opsz" 144, "SOFT" 100',
          }}
        >
          {display}
        </motion.span>
        {stat.suffix && (
          <span
            className="font-display text-3xl md:text-4xl"
            style={{
              color: stat.color,
              fontStyle: "italic",
              fontVariationSettings:
                '"opsz" 144, "SOFT" 100, "WONK" 1',
              fontWeight: 400,
            }}
          >
            {stat.suffix}
          </span>
        )}
      </div>
      <p
        className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em]"
        style={{ color: stat.color }}
      >
        {stat.label}
      </p>
      <p
        className="mt-2 text-sm"
        style={{ color: "rgba(244,239,230,0.55)" }}
      >
        {stat.caption}
      </p>
    </motion.div>
  );
}
