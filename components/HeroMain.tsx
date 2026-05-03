import { HeroHeadline } from "@/components/HeroHeadline";

const MARQUEE_ITEMS = [
  "Billboard",
  "Videotron LED",
  "Neonbox",
  "Megatron",
  "Jembatan Penyeberangan",
  "Jakarta",
  "Surabaya",
  "Bali",
  "Bandung",
] as const;

export function HeroMain() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-steel text-paper">
      <BackgroundLayer />

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="flex flex-1 items-center px-4 pt-28 pb-40 md:px-10 md:pt-32 lg:px-16">
          <div className="max-w-6xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/60">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-paper/40" />
              Out-of-home, made colorful
            </p>

            <HeroHeadline />

            <p className="mt-8 max-w-xl text-base leading-relaxed text-paper/75 md:text-lg">
              From Jakarta skylines to Bali beachfronts — billboards,
              videotrons, neonbox, megatrons, and pedestrian bridges, planned
              and lit by warna-warni.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#inventory"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-paper hover:-translate-y-px hover:shadow-glow"
                style={{
                  transition:
                    "transform var(--duration-fast) var(--ease-out-quint), box-shadow var(--duration-base) var(--ease-out-quint)",
                }}
              >
                Explore inventory
                <Arrow />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-6 py-3 text-sm font-medium text-paper hover:border-paper/40 hover:bg-paper/5"
                style={{
                  transition:
                    "border-color var(--duration-base) var(--ease-out-quint), background-color var(--duration-base) var(--ease-out-quint)",
                }}
              >
                Get a proposal
              </a>
            </div>
          </div>
        </div>

        <ScrollIndicator />
        <Marquee />
      </div>
    </section>
  );
}

function BackgroundLayer() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Red radial glow */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 70% 10%, rgb(232 50 10 / 0.45), transparent 65%), radial-gradient(50% 60% at 15% 90%, rgb(232 50 10 / 0.18), transparent 60%)",
        }}
      />

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 animate-grid-shift opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(245 242 236 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(245 242 236 / 0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px, 60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 50%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 50%, transparent 90%)",
        }}
      />

      {/* Floating blur orbs */}
      <div
        className="absolute -left-20 top-32 h-[28rem] w-[28rem] animate-orb-a rounded-full bg-accent/30"
        style={{ filter: "blur(96px)" }}
      />
      <div
        className="absolute -right-24 bottom-24 h-[24rem] w-[24rem] animate-orb-b rounded-full bg-accent-warm/20"
        style={{ filter: "blur(110px)" }}
      />

      {/* Subtle vignette toward bottom for marquee legibility */}
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgb(26 26 46 / 0.7), transparent)",
        }}
      />
    </div>
  );
}

function Marquee() {
  return (
    <div
      aria-hidden
      className="relative z-10 overflow-hidden border-y border-ink/20 bg-accent text-paper"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap py-3">
        <Track />
        <Track />
      </div>
    </div>
  );
}

function Track() {
  return (
    <ul className="flex shrink-0 items-center">
      {MARQUEE_ITEMS.map((item) => (
        <li
          key={item}
          className="flex items-center gap-6 px-6 font-display text-2xl tracking-tight md:text-3xl"
        >
          <span>{item}</span>
          <Asterisk />
        </li>
      ))}
    </ul>
  );
}

function Asterisk() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="shrink-0 text-paper/70"
    >
      <path
        d="M7 0v14M0 7h14M2 2l10 10M12 2L2 12"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ScrollIndicator() {
  return (
    <div className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex md:right-8">
      <span
        className="font-mono text-[10px] uppercase tracking-[0.32em] text-paper/55"
        style={{ writingMode: "vertical-rl" }}
      >
        Scroll
      </span>
      <div className="relative h-14 w-px overflow-hidden bg-paper/15">
        <span className="absolute inset-x-0 top-0 block h-4 animate-scroll-hint bg-accent" />
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
