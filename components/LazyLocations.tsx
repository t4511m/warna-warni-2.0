"use client";

import dynamic from "next/dynamic";

const Locations = dynamic(
  () => import("@/components/Locations").then((m) => m.Locations),
  {
    ssr: false,
    loading: () => <LocationsPlaceholder />,
  },
);

export function LazyLocations() {
  return <Locations />;
}

function LocationsPlaceholder() {
  return (
    <section
      aria-busy
      style={{
        backgroundColor: "var(--color-carbon)",
        color: "var(--color-kapur)",
      }}
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-8 md:py-32">
        <div className="grid gap-8 md:grid-cols-12">
          <p
            className="md:col-span-4 font-mono text-[10px] uppercase tracking-[0.28em]"
            style={{ color: "var(--color-cinnabar)" }}
          >
            — №05 — Locations
          </p>
          <div
            className="h-16 animate-pulse md:col-span-8"
            style={{ backgroundColor: "rgba(244,239,230,0.04)" }}
          />
        </div>
        <div
          className="mt-12 h-[440px] animate-pulse md:mt-16 md:h-[600px] lg:h-[680px]"
          style={{ backgroundColor: "rgba(244,239,230,0.04)" }}
        />
      </div>
    </section>
  );
}
