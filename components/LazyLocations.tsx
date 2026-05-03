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
    <section className="bg-ink text-paper" aria-busy>
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-10 md:py-28 lg:px-16">
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/60 md:col-span-3">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-paper/40" />
            Locations
          </p>
          <div className="h-16 animate-pulse rounded bg-paper/5 md:col-span-9" />
        </div>
        <div className="mt-14 h-[420px] animate-pulse rounded-xl bg-paper/5 md:mt-20 md:h-[560px] lg:h-[640px]" />
      </div>
    </section>
  );
}
