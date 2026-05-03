import { HeroHeadline } from "@/components/HeroHeadline";
import { Reveal } from "@/components/Reveal";

export function HeroMain() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-paper text-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(70% 60% at 50% 100%, rgb(245 245 247) 0%, rgba(245,245,247,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, rgb(0 0 0 / 0.06), transparent)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-32 text-center md:px-10 md:py-40">
        <HeroHeadline />

        <Reveal delay={0.55} y={16}>
          <p className="mx-auto mt-8 max-w-xl text-base text-muted md:text-xl md:leading-relaxed">
            From Jakarta skylines to Bali beachfronts — billboards, videotrons,
            neonbox, and pedestrian bridges, all in one network.
          </p>
        </Reveal>

        <Reveal delay={0.75} y={16}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#inventory"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-base font-medium text-paper hover:scale-[1.03]"
              style={{
                transition:
                  "transform var(--duration-base) var(--ease-out-quint)",
              }}
            >
              Explore inventory
            </a>
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
