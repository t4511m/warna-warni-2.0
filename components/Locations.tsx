"use client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";

type City = {
  name: string;
  coords: [number, number];
  count: number;
  region: string;
};

const CITIES: readonly City[] = [
  { name: "Jakarta", coords: [106.8456, -6.2088], count: 412, region: "Java" },
  { name: "Surabaya", coords: [112.7521, -7.2575], count: 187, region: "Java" },
  { name: "Bandung", coords: [107.6098, -6.9175], count: 138, region: "Java" },
  { name: "Bali", coords: [115.2126, -8.6705], count: 96, region: "Bali" },
  { name: "Medan", coords: [98.6722, 3.5952], count: 124, region: "Sumatera" },
  { name: "Makassar", coords: [119.4327, -5.1477], count: 78, region: "Sulawesi" },
] as const;

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function Locations() {
  return (
    <section className="bg-mist text-ink" id="locations">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-12">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Locations
            </p>
            <h2
              className="mt-4 font-semibold tracking-[-0.025em] text-ink"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.75rem)",
                lineHeight: 1.05,
                fontWeight: 700,
              }}
            >
              From Sumatera to{" "}
              <span className="text-muted">Sulawesi.</span>
            </h2>
            <p className="mt-5 text-base text-muted md:text-lg">
              A live map of the cities we operate in — billboards, videotrons,
              neonbox, and pedestrian bridges across six metros.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 md:mt-20">
            <MapView />
          </div>
        </Reveal>

        <CityGrid />
      </div>
    </section>
  );
}

function MapView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!TOKEN) return;

    mapboxgl.accessToken = TOKEN;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [118, -2.5],
      zoom: 4.5,
      attributionControl: false,
      cooperativeGestures: true,
    });
    mapRef.current = map;

    map.addControl(new mapboxgl.AttributionControl({ compact: true }));

    CITIES.forEach((city) => {
      const el = document.createElement("div");
      el.className = "map-marker";
      el.setAttribute("aria-label", `${city.name} — ${city.count} locations`);

      const ring = document.createElement("div");
      ring.className = "ring";
      const dot = document.createElement("div");
      dot.className = "dot";
      el.append(ring, dot);

      const popup = new mapboxgl.Popup({
        offset: 18,
        closeButton: false,
        anchor: "bottom",
      }).setHTML(`
        <div class="map-popup">
          <div class="city">${city.name}</div>
          <div class="count">${city.count} locations</div>
        </div>
      `);

      new mapboxgl.Marker({ element: el })
        .setLngLat(city.coords)
        .setPopup(popup)
        .addTo(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-ink shadow-card">
      <div
        ref={containerRef}
        className="h-[420px] w-full md:h-[560px] lg:h-[640px]"
        aria-label="Map of locations across Indonesia"
      />
      {!TOKEN && <MapFallback />}
    </div>
  );
}

function MapFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-ink p-8 text-paper">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 40%, rgb(232 50 10 / 0.18), transparent 70%)",
        }}
      />
      <div className="relative max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Map unavailable
        </p>
        <p className="mt-3 text-2xl font-semibold tracking-tight text-paper md:text-3xl">
          Set <code className="text-accent">NEXT_PUBLIC_MAPBOX_TOKEN</code> to
          enable the live map.
        </p>
        <p className="mt-3 text-sm text-paper/70">
          Six cities, 1000+ locations across Indonesia — Jakarta, Surabaya,
          Bandung, Bali, Medan, Makassar.
        </p>
      </div>
    </div>
  );
}

function CityGrid() {
  return (
    <Stagger
      stagger={0.05}
      className="mt-8 grid grid-cols-2 gap-3 md:mt-10 md:grid-cols-3 md:gap-5 lg:grid-cols-6"
    >
      {CITIES.map((c) => (
        <StaggerItem key={c.name} className="flex">
          <article
            className="group relative flex w-full flex-col gap-1 overflow-visible rounded-2xl bg-paper p-6 pb-7 shadow-card ring-0 ring-accent/0 hover:-translate-y-1 hover:shadow-card-hover hover:ring-2 hover:ring-accent/25"
            style={{
              transition:
                "transform var(--duration-slow) var(--ease-out-quint), box-shadow var(--duration-slow) var(--ease-out-quint), --tw-ring-color var(--duration-base) var(--ease-out-quint)",
            }}
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 rounded-t-2xl bg-accent group-hover:scale-x-100"
              style={{
                transition:
                  "transform var(--duration-slow) var(--ease-out-quint)",
              }}
            />
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              {c.region}
            </p>
            <p className="pb-0.5 text-2xl font-semibold tracking-tight text-ink">
              {c.name}
            </p>
            <p className="mt-2 pb-1 text-sm font-medium text-accent">
              {c.count} locations
            </p>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
