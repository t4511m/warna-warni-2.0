"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Tilt3D } from "@/components/Tilt3D";

type Product = {
  slug: string;
  name: string;
  tag: string;
  blurb: string;
  spec: string;
  bg: string;
  fg: string;
  index: string;
  size: "tall" | "wide" | "square";
};

const PRODUCTS: readonly Product[] = [
  {
    slug: "billboard",
    name: "Billboard",
    tag: "Static · Large-format",
    blurb:
      "Iconic roadside boards across primary arteries. Skyline-scale presence at the speed of traffic.",
    spec: "5×10m up to 10×30m",
    bg: "var(--color-cinnabar)",
    fg: "var(--color-kapur)",
    index: "01",
    size: "wide",
  },
  {
    slug: "videotron",
    name: "Videotron LED",
    tag: "Digital · Full-motion",
    blurb:
      "High-luminance LED for day-and-night reach. Animated content, slot rotation, day-parting.",
    spec: "P6 · P8 · P10 pitch",
    bg: "var(--color-ultramarine)",
    fg: "var(--color-kapur)",
    index: "02",
    size: "tall",
  },
  {
    slug: "neonbox",
    name: "Neonbox",
    tag: "Backlit · Street level",
    blurb:
      "Crisp brand presence at street level. Always-on LED backlit signage that runs through the night.",
    spec: "Custom 1m–6m widths",
    bg: "var(--color-sand)",
    fg: "var(--color-carbon)",
    index: "03",
    size: "square",
  },
  {
    slug: "megatron",
    name: "Megatron",
    tag: "Anchor · Landmark",
    blurb:
      "Wide-format dominance at city landmarks. The format that defines a skyline corner.",
    spec: "Up to 600m² faces",
    bg: "var(--color-magenta)",
    fg: "var(--color-kapur)",
    index: "04",
    size: "wide",
  },
  {
    slug: "bridge",
    name: "Jembatan Penyeberangan",
    tag: "Pedestrian bridge",
    blurb:
      "Eye-level coverage at footfall hotspots — the format your audience actually walks under, daily.",
    spec: "Both faces · 24×3m",
    bg: "var(--color-jade)",
    fg: "var(--color-kapur)",
    index: "05",
    size: "tall",
  },
] as const;

export function Products() {
  return (
    <section
      style={{ backgroundColor: "var(--color-kapur)" }}
      id="inventory"
      aria-labelledby="products-title"
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
                №03 — Inventory
              </span>
            </div>
          </div>
          <div className="md:col-span-8">
            <h2
              id="products-title"
              className="font-display tracking-[-0.035em]"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                lineHeight: 0.98,
                color: "var(--color-carbon)",
                fontWeight: 300,
                fontVariationSettings: '"opsz" 144, "SOFT" 100',
              }}
            >
              Five formats.{" "}
              <span
                className="text-cinnabar"
                style={{
                  fontStyle: "italic",
                  fontVariationSettings:
                    '"opsz" 144, "SOFT" 100, "WONK" 1',
                }}
              >
                One network.
              </span>
            </h2>
            <p
              className="mt-6 max-w-xl text-base leading-relaxed md:text-lg"
              style={{ color: "var(--color-graphite)" }}
            >
              From skyline-scale billboards to the neonbox at the corner — every
              format we operate, ready to plan against.
            </p>
          </div>
        </header>

        {/* Editorial bento — asymmetric grid */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-12 md:grid-rows-[auto_auto_auto] md:gap-5 lg:auto-rows-[18rem]">
          <BentoCell product={PRODUCTS[0]} className="md:col-span-7 md:row-span-1" />
          <BentoCell product={PRODUCTS[1]} className="md:col-span-5 md:row-span-2" />
          <BentoCell product={PRODUCTS[2]} className="md:col-span-3 md:row-span-1" />
          <BentoCell product={PRODUCTS[3]} className="md:col-span-4 md:row-span-1" />
          <BentoCell product={PRODUCTS[4]} className="md:col-span-12 lg:col-span-12 lg:row-span-1" />
        </div>
      </div>
    </section>
  );
}

function BentoCell({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${className}`}
    >
      <Tilt3D max={3} className="h-full">
        <a
          href={`#${product.slug}`}
          data-cursor="grow"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="group relative flex h-full w-full flex-col justify-between overflow-hidden p-6 md:p-8 lg:p-10"
          style={{
            backgroundColor: product.bg,
            color: product.fg,
            minHeight: "16rem",
          }}
        >
          {/* Decorative giant index */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-2 top-0 select-none font-display leading-[0.85]"
            style={{
              color: product.fg,
              opacity: 0.16,
              fontSize: "clamp(8rem, 22vw, 18rem)",
              fontStyle: "italic",
              fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
              fontWeight: 300,
              letterSpacing: "-0.06em",
              transform: hovered ? "translateX(-12px)" : "translateX(0)",
              transition:
                "transform var(--duration-deliberate) var(--ease-out-quint)",
            }}
          >
            {product.index}
          </span>

          {/* Top: tag */}
          <div className="relative z-10 flex items-start justify-between">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.24em]"
              style={{ color: product.fg, opacity: 0.8 }}
            >
              {product.tag}
            </span>
            <span
              aria-hidden
              className="inline-block transition-transform"
              style={{
                color: product.fg,
                transform: hovered
                  ? "translate(4px, -4px)"
                  : "translate(0, 0)",
                transition:
                  "transform var(--duration-base) var(--ease-out-quint)",
              }}
            >
              ↗
            </span>
          </div>

          {/* Bottom: name + blurb */}
          <div className="relative z-10 mt-auto flex flex-col gap-3">
            <h3
              className="font-display tracking-[-0.025em]"
              style={{
                color: product.fg,
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                lineHeight: 1,
                fontWeight: 400,
                fontVariationSettings: '"opsz" 144, "SOFT" 100',
              }}
            >
              {product.name}
            </h3>
            <p
              className="max-w-md text-sm leading-relaxed md:text-base"
              style={{ color: product.fg, opacity: 0.85 }}
            >
              {product.blurb}
            </p>
            <div className="mt-4 flex items-center justify-between border-t pt-3"
              style={{ borderColor: `color-mix(in srgb, ${product.fg} 25%, transparent)` }}
            >
              <span
                className="font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: product.fg, opacity: 0.7 }}
              >
                {product.spec}
              </span>
              <span
                className="font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: product.fg, opacity: 0.7 }}
              >
                — №{product.index}
              </span>
            </div>
          </div>
        </a>
      </Tilt3D>
    </motion.div>
  );
}
