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
      "Crews on the ground, on call. Cleaning, repair, and content rotation handled.",
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
    <section className="bg-paper text-ink" id="solutions">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-12">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Solutions
            </p>
            <h2
              className="mt-4 font-semibold tracking-[-0.025em] text-ink"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.75rem)",
                lineHeight: 1.05,
                fontWeight: 700,
              }}
            >
              End-to-end OOH,{" "}
              <span className="text-muted">handled.</span>
            </h2>
            <p className="mt-5 text-base text-muted md:text-lg">
              One partner from the first site walk to the post-campaign report —
              so your team focuses on the brand, not the logistics.
            </p>
          </div>
        </Reveal>

        <Stagger
          stagger={0.06}
          className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
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
    <article
      className="group relative flex w-full flex-col overflow-hidden rounded-3xl bg-mist p-7 hover:-translate-y-1 hover:shadow-card-hover md:p-8"
      style={{
        transition:
          "transform var(--duration-slow) var(--ease-out-quint), box-shadow var(--duration-slow) var(--ease-out-quint)",
      }}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent group-hover:scale-x-100"
        style={{
          transition: "transform var(--duration-slow) var(--ease-out-quint)",
        }}
      />

      <span className="text-sm font-medium tracking-wide text-muted">
        {solution.number}
      </span>

      <h3 className="mt-10 text-2xl font-semibold tracking-tight text-ink md:mt-14 md:text-[1.75rem]">
        {solution.title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-muted">
        {solution.description}
      </p>
    </article>
  );
}
