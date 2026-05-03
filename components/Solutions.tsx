import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";

type Solution = {
  number: string;
  title: string;
  description: string;
};

const SOLUTIONS: readonly Solution[] = [
  {
    number: "01",
    title: "Site survey & planning",
    description:
      "Footfall, sightline, and audience profiling to find the locations that actually move the needle.",
  },
  {
    number: "02",
    title: "Creative production",
    description:
      "Design, fabrication, and print — every format from large-format vinyl to LED content.",
  },
  {
    number: "03",
    title: "Permits & licensing",
    description:
      "We navigate municipal permits across six cities so your campaign launches on time.",
  },
  {
    number: "04",
    title: "Installation & maintenance",
    description:
      "Crews on the ground, on-call. Cleaning, repair, and content rotation handled.",
  },
  {
    number: "05",
    title: "Audience measurement",
    description:
      "Verified impressions, traffic data, and post-campaign reporting you can show a CMO.",
  },
  {
    number: "06",
    title: "Network buying",
    description:
      "Bundle billboards, videotrons, and bridges for city-wide saturation in a single deal.",
  },
] as const;

export function Solutions() {
  return (
    <section className="relative bg-steel text-paper" id="solutions">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(50% 50% at 0% 0%, rgb(232 50 10 / 0.18), transparent 60%), radial-gradient(50% 50% at 100% 100%, rgb(245 166 35 / 0.12), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-10 md:py-28 lg:px-16">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12 md:gap-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/60 md:col-span-3">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-paper/40" />
              Solutions
            </p>
            <h2
              className="font-display tracking-[-0.02em] text-paper md:col-span-9"
              style={{
                fontWeight: 800,
                fontSize: "clamp(2.25rem, 5vw, 4.5rem)",
                lineHeight: 1.02,
              }}
            >
              End-to-end OOH,
              <br />
              <em className="italic text-accent">handled.</em>
            </h2>
            <p className="max-w-2xl text-base text-paper/70 md:col-span-9 md:col-start-4 md:text-lg">
              One partner from the first site walk to the post-campaign report —
              so your team focuses on the brand, not the logistics.
            </p>
          </div>
        </Reveal>

        <Stagger
          stagger={0.06}
          className="mt-14 grid grid-cols-1 gap-px bg-paper/10 md:mt-20 md:grid-cols-3 md:grid-rows-2"
        >
          {SOLUTIONS.map((s) => (
            <StaggerItem key={s.number} className="flex">
              <SolutionCard solution={s} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <article className="group relative w-full overflow-hidden bg-steel p-6 md:p-8">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent group-hover:scale-x-100"
        style={{
          transition:
            "transform var(--duration-slow) var(--ease-out-quint)",
        }}
      />

      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs tracking-[0.28em] text-paper/45">
          {solution.number}
        </span>
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-paper/15 text-paper/60 group-hover:border-accent group-hover:text-accent"
          style={{
            transition:
              "border-color var(--duration-base) var(--ease-out-quint), color var(--duration-base) var(--ease-out-quint)",
          }}
        >
          <ArrowUpRight />
        </span>
      </div>

      <h3
        className="mt-10 font-display text-3xl leading-tight tracking-tight text-paper md:mt-16 md:text-[2rem]"
        style={{ fontWeight: 600 }}
      >
        {solution.title}
      </h3>
      <p className="mt-3 max-w-sm text-sm text-paper/65 md:text-base">
        {solution.description}
      </p>
    </article>
  );
}

function ArrowUpRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
