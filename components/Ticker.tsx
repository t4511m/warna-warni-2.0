"use client";

import { Marquee } from "@/components/Marquee";

type TickerProps = {
  items: readonly string[];
  separator?: React.ReactNode;
  variant?: "ink" | "cinnabar" | "ultramarine" | "jade" | "magenta" | "carbon";
  speed?: "slow" | "mid" | "fast";
  reverse?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  border?: boolean;
};

const VARIANT_BG: Record<NonNullable<TickerProps["variant"]>, string> = {
  ink: "var(--color-kapur)",
  cinnabar: "var(--color-cinnabar)",
  ultramarine: "var(--color-ultramarine)",
  jade: "var(--color-jade)",
  magenta: "var(--color-magenta)",
  carbon: "var(--color-carbon)",
};

const VARIANT_FG: Record<NonNullable<TickerProps["variant"]>, string> = {
  ink: "var(--color-carbon)",
  cinnabar: "var(--color-kapur)",
  ultramarine: "var(--color-kapur)",
  jade: "var(--color-kapur)",
  magenta: "var(--color-kapur)",
  carbon: "var(--color-kapur)",
};

const SIZE: Record<NonNullable<TickerProps["size"]>, string> = {
  sm: "py-2 text-xs",
  md: "py-3 text-sm md:py-4 md:text-base",
  lg: "py-5 text-2xl md:py-6 md:text-3xl",
  xl: "py-6 text-4xl md:py-10 md:text-7xl",
};

export function Ticker({
  items,
  separator = "✦",
  variant = "ink",
  speed = "mid",
  reverse = false,
  size = "md",
  border = false,
}: TickerProps) {
  return (
    <div
      className={`relative ${SIZE[size]} ${border ? "border-y" : ""}`}
      style={{
        backgroundColor: VARIANT_BG[variant],
        color: VARIANT_FG[variant],
        borderColor: "var(--color-line)",
      }}
    >
      <Marquee speed={speed} reverse={reverse} fade={false} pauseOnHover={false}>
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center font-mono uppercase tracking-[0.18em]"
          >
            <span className="px-6 md:px-10 whitespace-nowrap">{item}</span>
            <span aria-hidden className="opacity-50">
              {separator}
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

type DisplayTickerProps = {
  items: readonly string[];
  variant?: TickerProps["variant"];
  speed?: TickerProps["speed"];
  reverse?: boolean;
};

/** Big editorial display ticker — Fraunces serif, oversized, used as section divider */
export function DisplayTicker({
  items,
  variant = "ink",
  speed = "slow",
  reverse = false,
}: DisplayTickerProps) {
  return (
    <div
      className="relative py-4 md:py-6"
      style={{
        backgroundColor: VARIANT_BG[variant],
        color: VARIANT_FG[variant],
      }}
    >
      <Marquee speed={speed} reverse={reverse} fade={false} pauseOnHover={false}>
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center"
            style={{
              fontFamily: "var(--font-display)",
              fontVariationSettings: '"opsz" 144, "SOFT" 100',
              fontSize: "clamp(3.5rem, 12vw, 11rem)",
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            <span className="px-8 md:px-14 whitespace-nowrap">{item}</span>
            <span
              aria-hidden
              className="text-cinnabar"
              style={{
                fontStyle: "italic",
                fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
              }}
            >
              ✦
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
