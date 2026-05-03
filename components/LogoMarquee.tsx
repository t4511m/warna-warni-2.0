"use client";

import { useState } from "react";

const CLIENTS = [
  "Indofood",
  "BCA",
  "Telkomsel",
  "Gojek",
  "Tokopedia",
  "Astra",
  "Garuda Indonesia",
  "Pertamina",
  "BRI",
  "Mandiri",
  "Unilever",
  "Coca-Cola",
] as const;

const FADE_MASK =
  "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)";

export function LogoMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      className="bg-paper py-16 md:py-20"
      aria-label="Selected clients"
    >
      <p className="px-6 pb-1 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted md:px-10">
        Trusted by brands across Indonesia
      </p>
      <div
        className="mt-8 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          maskImage: FADE_MASK,
          WebkitMaskImage: FADE_MASK,
        }}
      >
        <div
          className="flex w-max animate-marquee"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          <Track />
          <Track />
        </div>
      </div>
    </section>
  );
}

function Track() {
  return (
    <ul className="flex shrink-0 items-center">
      {CLIENTS.map((c) => (
        <li
          key={c}
          className="flex items-center gap-12 px-8 pb-1 text-2xl font-semibold tracking-tight text-ink/30 md:text-3xl"
        >
          <span>{c}</span>
        </li>
      ))}
    </ul>
  );
}
