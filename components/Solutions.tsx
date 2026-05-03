"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedDivider } from "@/components/AnimatedDivider";
import { Reveal } from "@/components/Reveal";

type Solution = {
  number: string;
  title: string;
  description: string;
  gradient: string;
};

const SOLUTIONS: readonly Solution[] = [
  {
    number: "01",
    title: "Site survey & planning",
    description:
      "Footfall, sightline, and audience profiling to find the locations that actually move the needle.",
    gradient:
      "linear-gradient(135deg, #FFE4D9 0%, #FFCFB8 50%, #FFB897 100%)",
  },
  {
    number: "02",
    title: "Creative production",
    description:
      "Design, fabrication, and print — every format from large-format vinyl to LED content.",
    gradient:
      "linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 50%, #A5B4FC 100%)",
  },
  {
    number: "03",
    title: "Permits & licensing",
    description:
      "We navigate municipal permits across six cities so your campaign launches on time.",
    gradient:
      "linear-gradient(135deg, #FFF7E6 0%, #FFE4B5 50%, #FFD08A 100%)",
  },
  {
    number: "04",
    title: "Installation & maintenance",
    description:
      "Crews on the ground, on call. Cleaning, repair, and content rotation handled.",
    gradient:
      "linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 50%, #F48FB1 100%)",
  },
  {
    number: "05",
    title: "Audience measurement",
    description:
      "Verified impressions, traffic data, and post-campaign reporting you can show a CMO.",
    gradient:
      "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 50%, #A5D6A7 100%)",
  },
  {
    number: "06",
    title: "Network buying",
    description:
      "Bundle billboards, videotrons, and bridges for city-wide saturation in a single deal.",
    gradient:
      "linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 50%, #80DEEA 100%)",
  },
] as const;

export function Solutions() {
  return (
    <section className="bg-paper text-ink" id="solutions">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-12">
        <Reveal>
          <div className="mx-auto max-w-3xl pb-1 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Solutions
            </p>
            <h2
              className="mt-4 pb-1 font-semibold tracking-[-0.025em] text-ink"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.75rem)",
                lineHeight: 1.08,
                fontWeight: 700,
              }}
            >
              End-to-end OOH,{" "}
              <span className="text-muted">handled.</span>
            </h2>
            <p className="mt-5 pb-1 text-base leading-relaxed text-muted md:text-lg">
              One partner from the first site walk to the post-campaign report
              — so your team focuses on the brand, not the logistics.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col gap-20 md:mt-28 md:gap-28">
          {SOLUTIONS.map((s, i) => (
            <SolutionRow key={s.number} solution={s} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionRow({
  solution,
  flip,
}: {
  solution: Solution;
  flip: boolean;
}) {
  return (
    <div>
      <AnimatedDivider className="mb-12 md:mb-16" />
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <SlideIn
          from={flip ? "right" : "left"}
          className={`order-2 ${flip ? "md:order-2" : "md:order-1"}`}
        >
          <TextBlock solution={solution} />
        </SlideIn>
        <SlideIn
          from={flip ? "left" : "right"}
          className={`order-1 ${flip ? "md:order-1" : "md:order-2"}`}
          delay={0.1}
        >
          <VisualBlock solution={solution} />
        </SlideIn>
      </div>
    </div>
  );
}

function TextBlock({ solution }: { solution: Solution }) {
  return (
    <div className="overflow-visible pb-1">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
        {solution.number}
      </p>
      <h3
        className="mt-4 pb-1 font-semibold leading-[1.1] tracking-[-0.02em] text-ink"
        style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
      >
        {solution.title}
      </h3>
      <p className="mt-4 max-w-md pb-1 text-base leading-relaxed text-muted md:text-lg">
        {solution.description}
      </p>
    </div>
  );
}

function VisualBlock({ solution }: { solution: Solution }) {
  return (
    <div
      className="relative aspect-[5/4] w-full overflow-hidden rounded-3xl shadow-card"
      style={{ backgroundImage: solution.gradient }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 100% 100%, rgb(0 0 0 / 0.06), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 flex items-end justify-end overflow-visible p-6 md:p-10">
        <span
          aria-hidden
          className="font-semibold leading-none tracking-[-0.05em] text-ink/15"
          style={{ fontSize: "clamp(8rem, 22vw, 18rem)" }}
        >
          {solution.number}
        </span>
      </div>
    </div>
  );
}

function SlideIn({
  children,
  from,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  from: "left" | "right";
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const x = from === "left" ? -40 : 40;
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, x }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 18,
        mass: 0.9,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
