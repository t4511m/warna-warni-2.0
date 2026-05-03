import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";

type Product = {
  area: "billboard" | "videotron" | "neonbox" | "megatron" | "bridge";
  name: string;
  tag: string;
  blurb: string;
  glow: string;
  display: "xl" | "lg" | "md" | "sm";
};

const PRODUCTS: readonly Product[] = [
  {
    area: "billboard",
    name: "Billboard",
    tag: "Static large-format",
    blurb: "Iconic roadside boards across primary arteries.",
    glow: "radial-gradient(70% 60% at 80% 10%, rgb(232 50 10 / 0.55), transparent 65%)",
    display: "xl",
  },
  {
    area: "videotron",
    name: "Videotron LED",
    tag: "Full-motion digital",
    blurb: "High-luminance LED for day-and-night reach.",
    glow: "radial-gradient(60% 60% at 50% 30%, rgb(245 166 35 / 0.45), transparent 70%)",
    display: "md",
  },
  {
    area: "neonbox",
    name: "Neonbox",
    tag: "Backlit signage",
    blurb: "Crisp brand presence at street-level.",
    glow: "radial-gradient(70% 70% at 30% 30%, rgb(232 50 10 / 0.35), transparent 70%)",
    display: "sm",
  },
  {
    area: "megatron",
    name: "Megatron",
    tag: "Anchor placements",
    blurb: "Wide-format dominance at city landmarks.",
    glow: "radial-gradient(50% 80% at 90% 50%, rgb(245 166 35 / 0.35), transparent 70%)",
    display: "lg",
  },
  {
    area: "bridge",
    name: "Jembatan Penyeberangan",
    tag: "Pedestrian bridge",
    blurb: "Eye-level coverage at footfall hotspots.",
    glow: "radial-gradient(70% 90% at 50% 100%, rgb(232 50 10 / 0.4), transparent 70%)",
    display: "md",
  },
] as const;

const TITLE_SIZE: Record<Product["display"], string> = {
  xl: "text-4xl md:text-6xl",
  lg: "text-3xl md:text-5xl",
  md: "text-2xl md:text-3xl",
  sm: "text-xl md:text-2xl",
};

export function Products() {
  return (
    <section className="bg-paper text-ink" id="inventory">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-10 md:py-28 lg:px-16">
        <Reveal>
          <SectionHeader
            eyebrow="Inventory"
            title={
              <>
                Five formats.
                <br />
                <em className="italic text-accent">One network.</em>
              </>
            }
            description="From skyline-scale billboards to the neonbox at the corner — every format we operate, ready to plan against."
          />
        </Reveal>

        <Stagger className="bento-grid mt-14 grid grid-cols-1 gap-3 md:mt-20">
          {PRODUCTS.map((p) => (
            <StaggerItem
              key={p.area}
              className="flex"
              style={{ gridArea: p.area, minHeight: "220px" }}
            >
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative w-full overflow-hidden rounded-xl bg-steel">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundImage: product.glow }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgb(10 10 10 / 0.85) 0%, rgb(10 10 10 / 0.45) 45%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(245 242 236 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(245 242 236 / 0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/60">
            {product.tag}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h3
              className={`font-display ${TITLE_SIZE[product.display]} leading-[1] tracking-tight text-paper`}
            >
              {product.name}
            </h3>
            <p className="mt-2 max-w-xs text-sm text-paper/70">
              {product.blurb}
            </p>
          </div>

          <span
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-paper/30 text-paper group-hover:translate-x-1 group-hover:border-accent group-hover:bg-accent"
            style={{
              transition:
                "transform var(--duration-base) var(--ease-out-quint), background-color var(--duration-base) var(--ease-out-quint), border-color var(--duration-base) var(--ease-out-quint)",
            }}
          >
            <ArrowUpRight />
          </span>
        </div>
      </div>
    </article>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-12 md:gap-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/60 md:col-span-3">
        <span className="mr-3 inline-block h-px w-8 align-middle bg-ink/40" />
        {eyebrow}
      </p>
      <h2
        className="font-display tracking-[-0.02em] text-ink md:col-span-9 md:text-7xl"
        style={{ fontWeight: 800, fontSize: "clamp(2.25rem, 5vw, 4.5rem)", lineHeight: 1.02 }}
      >
        {title}
      </h2>
      <p className="max-w-2xl text-base text-ink/70 md:col-span-9 md:col-start-4 md:text-lg">
        {description}
      </p>
    </div>
  );
}

function ArrowUpRight() {
  return (
    <svg
      width="16"
      height="16"
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
