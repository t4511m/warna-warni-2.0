"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

type Solution = {
  number: string;
  title: string;
  description: string;
  detail: string;
  color: string;
};

const SOLUTIONS: readonly Solution[] = [
  {
    number: "01",
    title: "Site survey & planning",
    description:
      "Footfall, sightline, and audience profiling to find the locations that actually move the needle.",
    detail:
      "Walked-and-mapped surveys, traffic counts, and audience overlay against your CRM. We arrive with a shortlist, not a brochure.",
    color: "var(--color-cinnabar)",
  },
  {
    number: "02",
    title: "Creative production",
    description:
      "Design, fabrication, and print — every format from large-format vinyl to LED content.",
    detail:
      "In-house creative team for static, motion, and dayparted LED. Studio-controlled colour profiles per format.",
    color: "var(--color-ultramarine)",
  },
  {
    number: "03",
    title: "Permits & licensing",
    description:
      "We navigate municipal permits across six cities so your campaign launches on time.",
    detail:
      "Fifty-year relationships with regional authorities. Permits are a known, scheduled step — not a surprise.",
    color: "var(--color-jade)",
  },
  {
    number: "04",
    title: "Installation & maintenance",
    description:
      "Crews on the ground, on call. Cleaning, repair, and content rotation handled.",
    detail:
      "Crews in every metro for fast swaps, scheduled maintenance windows, and 24/7 emergency response.",
    color: "var(--color-magenta)",
  },
  {
    number: "05",
    title: "Audience measurement",
    description:
      "Verified impressions, traffic data, and post-campaign reporting you can show a CMO.",
    detail:
      "Standardised against industry impression methodology. Every campaign ships with a post-flight report.",
    color: "var(--color-sand)",
  },
  {
    number: "06",
    title: "Network buying",
    description:
      "Bundle billboards, videotrons, and bridges for city-wide saturation in a single deal.",
    detail:
      "One contract. One invoice. Discounted rates across formats when you book the network as a package.",
    color: "var(--color-cinnabar)",
  },
] as const;

export function Solutions() {
  const [open, setOpen] = useState<string | null>("01");

  return (
    <section
      style={{
        backgroundColor: "var(--color-bone)",
        color: "var(--color-carbon)",
      }}
      id="solutions"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-8 md:py-32">
        <header className="grid gap-8 md:grid-cols-12">
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
                №04 — Solutions
              </span>
            </div>
          </div>
          <div className="md:col-span-8">
            <h2
              className="font-display tracking-[-0.035em]"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                lineHeight: 0.98,
                fontWeight: 300,
                fontVariationSettings: '"opsz" 144, "SOFT" 100',
              }}
            >
              End-to-end OOH,{" "}
              <span
                className="text-cinnabar"
                style={{
                  fontStyle: "italic",
                  fontVariationSettings:
                    '"opsz" 144, "SOFT" 100, "WONK" 1',
                }}
              >
                handled.
              </span>
            </h2>
            <p
              className="mt-6 max-w-xl text-base leading-relaxed md:text-lg"
              style={{ color: "var(--color-graphite)" }}
            >
              One partner from the first site walk to the post-campaign report —
              your team focuses on the brand, we handle the rest.
            </p>
          </div>
        </header>

        {/* Magazine table-of-contents */}
        <div className="mt-16 md:mt-20">
          {SOLUTIONS.map((s) => (
            <SolutionRow
              key={s.number}
              solution={s}
              open={open === s.number}
              onToggle={() =>
                setOpen((prev) => (prev === s.number ? null : s.number))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionRow({
  solution,
  open,
  onToggle,
}: {
  solution: Solution;
  open: boolean;
  onToggle: () => void;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderTop: "1px solid var(--color-carbon)",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        data-cursor="grow"
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-10"
      >
        <div className="flex items-center gap-6 md:gap-10">
          <span
            className="font-mono text-xs uppercase tracking-[0.24em] tabular-nums md:text-sm"
            style={{ color: solution.color, minWidth: "3ch" }}
          >
            №{solution.number}
          </span>
          <span
            className="font-display tracking-[-0.025em]"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
              lineHeight: 1.05,
              fontWeight: 300,
              fontVariationSettings: '"opsz" 144, "SOFT" 100',
              color: open ? solution.color : "var(--color-carbon)",
              transition: "color var(--duration-base) var(--ease-out-quint)",
            }}
          >
            {solution.title}
          </span>
        </div>
        <span
          aria-hidden
          className="shrink-0 font-display text-3xl md:text-4xl"
          style={{
            color: solution.color,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform var(--duration-slow) var(--ease-out-quint)",
            fontWeight: 300,
            fontVariationSettings: '"opsz" 144, "SOFT" 100',
          }}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.3, delay: 0.1 },
            }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 pb-10 md:grid-cols-12 md:gap-10 md:pb-14">
              <div className="md:col-span-4 md:col-start-3">
                <p
                  className="text-base leading-relaxed md:text-lg"
                  style={{ color: "var(--color-carbon)" }}
                >
                  {solution.description}
                </p>
              </div>
              <div className="md:col-span-5">
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--color-graphite)" }}
                >
                  {solution.detail}
                </p>
                <a
                  href="#contact"
                  data-cursor="grow"
                  className="mt-6 inline-flex items-center gap-2 border-b py-1 font-mono text-[10px] uppercase tracking-[0.28em]"
                  style={{
                    color: solution.color,
                    borderColor: solution.color,
                  }}
                >
                  <span>Brief us</span>
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
