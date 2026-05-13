"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { ChromaticDisk } from "@/components/ChromaticDisk";
import { HeroHeadline } from "@/components/HeroHeadline";
import { MagneticButton } from "@/components/MagneticButton";
import { Ticker } from "@/components/Ticker";

const HERO_TICKER = [
  "Billboard",
  "Videotron LED",
  "Neonbox",
  "Megatron",
  "Pedestrian Bridge",
  "Network Buying",
  "Audience Measurement",
] as const;

export function HeroMain() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const reduced = useReducedMotion();
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const diskY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--color-kapur)" }}
        aria-label="Warna Warni — out-of-home, in living color"
      >
        <BackgroundField />

        {/* Top utility bar — runs under the navbar */}
        <div
          className="relative z-10 hidden items-center justify-between border-b px-8 py-3 font-mono text-[10px] uppercase tracking-[0.24em] md:flex"
          style={{
            borderColor: "var(--color-line)",
            color: "var(--color-graphite)",
            paddingTop: "5.5rem",
          }}
        >
          <div className="flex items-center gap-6">
            <span>Vol. 24 — Edition 03</span>
            <span style={{ color: "var(--color-line)" }}>|</span>
            <span>Indonesian Out-Of-Home Network</span>
          </div>
          <div className="flex items-center gap-6">
            <span>06 Cities</span>
            <span style={{ color: "var(--color-line)" }}>|</span>
            <span style={{ color: "var(--color-cinnabar)" }}>
              Est. 1972
            </span>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-6 pb-10 pt-32 md:grid-cols-12 md:gap-8 md:px-8 md:pb-16 md:pt-12 lg:gap-14">
          <motion.div
            className="md:col-span-7"
            style={reduced ? undefined : { y: headlineY, opacity: fade }}
          >
            {/* Section marker */}
            <div className="mb-8 flex items-center gap-3 md:mb-10">
              <span
                className="h-px w-10"
                style={{ backgroundColor: "var(--color-cinnabar)" }}
              />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.28em]"
                style={{ color: "var(--color-cinnabar)" }}
              >
                №01 — The Network
              </span>
            </div>

            <HeroHeadline />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 max-w-xl text-base leading-relaxed md:text-lg"
              style={{ color: "var(--color-graphite)" }}
            >
              Six cities. Five formats. One network. From Jakarta skylines to
              Bali beachfronts — billboards, videotrons, neonbox, and pedestrian
              bridges, run by the operators who&rsquo;ve been doing this for
              fifty years.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton pull={0.3} className="inline-block">
                <a
                  href="#inventory"
                  data-cursor="grow"
                  className="group inline-flex items-center gap-3 px-7 py-4 text-base font-medium"
                  style={{
                    backgroundColor: "var(--color-carbon)",
                    color: "var(--color-kapur)",
                    transition:
                      "background-color var(--duration-base) var(--ease-out-quint), transform var(--duration-base) var(--ease-out-quint)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-cinnabar)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-carbon)";
                  }}
                >
                  <span>Explore inventory</span>
                  <span
                    aria-hidden
                    className="inline-block transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </MagneticButton>

              <a
                href="#contact"
                data-cursor="grow"
                className="group inline-flex items-center gap-3 border px-7 py-4 text-base font-medium"
                style={{
                  borderColor: "var(--color-carbon)",
                  color: "var(--color-carbon)",
                  transition:
                    "background-color var(--duration-base) var(--ease-out-quint), color var(--duration-base) var(--ease-out-quint)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-carbon)";
                  e.currentTarget.style.color = "var(--color-kapur)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--color-carbon)";
                }}
              >
                <span>Talk to us</span>
                <span aria-hidden>↗</span>
              </a>
            </motion.div>

            {/* Stats strip */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.6 }}
              className="mt-14 grid max-w-xl grid-cols-3 gap-4 border-t pt-6"
              style={{ borderColor: "var(--color-line)" }}
            >
              <MiniStat label="Years" value="50+" />
              <MiniStat label="Locations" value="1.000+" />
              <MiniStat label="Cities" value="06" />
            </motion.dl>
          </motion.div>

          <motion.div
            className="md:col-span-5 md:pl-4"
            style={reduced ? undefined : { y: diskY, opacity: fade }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <ChromaticDisk />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </section>

      {/* Marquee ticker — bridges hero into Stats */}
      <Ticker
        items={HERO_TICKER}
        variant="carbon"
        size="lg"
        speed="mid"
      />
    </>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt
        className="font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: "var(--color-graphite)" }}
      >
        {label}
      </dt>
      <dd
        className="mt-1.5 font-display text-3xl tracking-[-0.03em] md:text-4xl"
        style={{
          color: "var(--color-carbon)",
          fontVariationSettings: '"opsz" 144',
          fontWeight: 400,
        }}
      >
        {value}
      </dd>
    </div>
  );
}

function BackgroundField() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 25, damping: 25, mass: 1 });
  const sy = useSpring(my, { stiffness: 25, damping: 25, mass: 1 });

  const bg = useTransform([sx, sy], (latest) => {
    const [x, y] = latest as [number, number];
    return `radial-gradient(38% 38% at ${x}% ${y}%, rgba(242,93,39,0.10), transparent 70%), radial-gradient(50% 40% at 80% 20%, rgba(27,63,171,0.06), transparent 70%)`;
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
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: bg }}
      />
      {/* Decorative grid lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-line-soft) 1px, transparent 1px)
          `,
          backgroundSize: "calc(100% / 12) 100%",
          maxWidth: "1400px",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.4,
        }}
      />
      {/* Decorative corner brackets */}
      <CornerBracket position="tl" />
      <CornerBracket position="tr" />
    </>
  );
}

function CornerBracket({ position }: { position: "tl" | "tr" }) {
  const isLeft = position === "tl";
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute hidden h-6 w-6 md:block"
      style={{
        top: "5rem",
        [isLeft ? "left" : "right"]: "1.5rem",
        borderTop: "1px solid var(--color-carbon)",
        [isLeft ? "borderLeft" : "borderRight"]: "1px solid var(--color-carbon)",
      }}
    />
  );
}

function ScrollIndicator() {
  return (
    <div className="relative z-10 flex justify-center pb-10 md:pb-14">
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-3"
      >
        <span
          className="font-mono text-[10px] uppercase tracking-[0.28em]"
          style={{ color: "var(--color-graphite)" }}
        >
          Scroll
        </span>
        <span
          className="block h-10 w-px"
          style={{ backgroundColor: "var(--color-carbon)" }}
        />
      </motion.div>
    </div>
  );
}
