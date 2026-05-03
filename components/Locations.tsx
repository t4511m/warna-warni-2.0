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
    <section className="relative bg-ink text-paper" id="locations">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-10 md:py-28 lg:px-16">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12 md:gap-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/60 md:col-span-3">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-paper/40" />
              Locations
            </p>
            <h2
              className="font-display tracking-[-0.02em] text-paper md:col-span-9"
              style={{
                fontWeight: 800,
                fontSize: "clamp(2.25rem, 5vw, 4.5rem)",
                lineHeight: 1.02,
              }}
            >
              From Sumatera to
              <br />
              <em className="italic text-accent">Sulawesi.</em>
            </h2>
            <p className="max-w-2xl text-base text-paper/70 md:col-span-9 md:col-start-4 md:text-lg">
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
    <div className="relative overflow-hidden rounded-xl border border-paper/10 bg-steel">
      <div
        ref={containerRef}
        className="h-[420px] w-full md:h-[560px] lg:h-[640px]"
        aria-label="Map of warna-warni locations across Indonesia"
      />
      {!TOKEN && <MapFallback />}
    </div>
  );
}

function MapFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 40%, rgb(232 50 10 / 0.25), transparent 70%), radial-gradient(50% 50% at 80% 80%, rgb(245 166 35 / 0.15), transparent 70%)",
        }}
      />
      <div className="relative max-w-md text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/55">
          Map unavailable
        </p>
        <p className="mt-3 font-display text-2xl text-paper md:text-3xl">
          Set <code className="font-mono text-accent">NEXT_PUBLIC_MAPBOX_TOKEN</code> to enable the live map.
        </p>
        <p className="mt-3 text-sm text-paper/60">
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
      className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-paper/10 md:grid-cols-6"
    >
      {CITIES.map((c) => (
        <StaggerItem
          key={c.name}
          className="group relative flex flex-col gap-1 bg-ink p-5"
        >
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent group-hover:scale-x-100"
            style={{
              transition: "transform var(--duration-slow) var(--ease-out-quint)",
            }}
          />
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/45">
            {c.region}
          </p>
          <p className="font-display text-2xl leading-none tracking-tight text-paper">
            {c.name}
          </p>
          <p className="mt-2 font-mono text-xs tracking-wider text-accent">
            {c.count} locations
          </p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
