import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { Tilt3D } from "@/components/Tilt3D";

type Product = {
  slug: string;
  name: string;
  tag: string;
  blurb: string;
  gradient: string;
};

const PRODUCTS: readonly Product[] = [
  {
    slug: "billboard",
    name: "Billboard",
    tag: "Static large-format",
    blurb: "Iconic roadside boards across primary arteries.",
    gradient:
      "linear-gradient(135deg, #FFE4D9 0%, #FFCFB8 50%, #FFB897 100%)",
  },
  {
    slug: "videotron",
    name: "Videotron LED",
    tag: "Full-motion digital",
    blurb: "High-luminance LED for day-and-night reach.",
    gradient:
      "linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 50%, #A5B4FC 100%)",
  },
  {
    slug: "neonbox",
    name: "Neonbox",
    tag: "Backlit signage",
    blurb: "Crisp brand presence at street level.",
    gradient:
      "linear-gradient(135deg, #FFF7E6 0%, #FFE4B5 50%, #FFD08A 100%)",
  },
  {
    slug: "megatron",
    name: "Megatron",
    tag: "Anchor placements",
    blurb: "Wide-format dominance at city landmarks.",
    gradient:
      "linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 50%, #F48FB1 100%)",
  },
  {
    slug: "bridge",
    name: "Jembatan Penyeberangan",
    tag: "Pedestrian bridge",
    blurb: "Eye-level coverage at footfall hotspots.",
    gradient:
      "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 50%, #A5D6A7 100%)",
  },
] as const;

export function Products() {
  return (
    <section
      className="bg-paper text-ink"
      id="inventory"
      aria-labelledby="products-title"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-12">
        <Reveal>
          <SectionHeader
            label="Inventory"
            title={
              <>
                Five formats. <span className="text-muted">One network.</span>
              </>
            }
            description="From skyline-scale billboards to the neonbox at the corner — every format we operate, ready to plan against."
            id="products-title"
          />
        </Reveal>

        <Stagger
          stagger={0.07}
          className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7"
        >
          {PRODUCTS.map((p) => (
            <StaggerItem key={p.slug} className="flex">
              <Tilt3D max={5} className="w-full">
                <ProductCard product={p} />
              </Tilt3D>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article
      className="group flex h-full w-full flex-col overflow-hidden rounded-3xl bg-paper shadow-card hover:shadow-card-hover"
      style={{
        transition:
          "box-shadow var(--duration-slow) var(--ease-out-quint)",
      }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 group-hover:scale-105"
          style={{
            backgroundImage: product.gradient,
            transition:
              "transform var(--duration-deliberate) var(--ease-out-quint)",
          }}
        />
        <span className="absolute left-5 top-5 rounded-full bg-paper/85 px-3 py-1 text-xs font-medium text-ink backdrop-blur">
          {product.tag}
        </span>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(120% 80% at 100% 100%, rgb(0 0 0 / 0.08), transparent 60%)",
          }}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-visible p-6 pb-7 md:p-7 md:pb-8">
        <h3 className="pb-0.5 text-2xl font-semibold leading-tight tracking-tight text-ink md:text-[1.75rem]">
          {product.name}
        </h3>
        <p className="pb-1 text-base leading-relaxed text-muted">
          {product.blurb}
        </p>
        <div className="mt-auto flex items-center gap-2 pt-4 text-sm font-medium text-ink">
          <span>Learn more</span>
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
        </div>
      </div>
    </article>
  );
}

function SectionHeader({
  label,
  title,
  description,
  id,
}: {
  label: string;
  title: React.ReactNode;
  description: string;
  id?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl pb-1 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {label}
      </p>
      <h2
        id={id}
        className="mt-4 pb-1 font-semibold tracking-[-0.025em] text-ink"
        style={{
          fontSize: "clamp(2rem, 5vw, 3.75rem)",
          lineHeight: 1.08,
          fontWeight: 700,
        }}
      >
        {title}
      </h2>
      <p className="mt-5 pb-1 text-base leading-relaxed text-muted md:text-lg">
        {description}
      </p>
    </div>
  );
}
