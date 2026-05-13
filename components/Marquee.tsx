"use client";

import { useState } from "react";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  speed?: "slow" | "mid" | "fast";
  pauseOnHover?: boolean;
  fade?: boolean;
};

const FADE_MASK =
  "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)";

export function Marquee({
  children,
  className = "",
  reverse = false,
  speed = "mid",
  pauseOnHover = true,
  fade = true,
}: MarqueeProps) {
  const [paused, setPaused] = useState(false);

  const animation = reverse
    ? "var(--animate-marquee-reverse)"
    : speed === "slow"
      ? "var(--animate-marquee-slow)"
      : speed === "fast"
        ? "var(--animate-marquee-fast)"
        : "var(--animate-marquee)";

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
      style={
        fade
          ? { maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }
          : undefined
      }
    >
      <div
        className="flex w-max"
        style={{
          animation,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div aria-hidden className="flex shrink-0">
          {children}
        </div>
      </div>
    </div>
  );
}
