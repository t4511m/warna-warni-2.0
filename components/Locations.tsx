"use client";

import { motion, useReducedMotion } from "framer-motion";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";

type City = {
  name: string;
  coords: [number, number];
  count: number;
  region: string;
  color: string;
};

const CITIES: readonly City[] = [
  {
    name: "Jakarta",
    coords: [106.8456, -6.2088],
    count: 412,
    region: "Java",
    color: "var(--color-cinnabar)",
  },
  {
    name: "Surabaya",
    coords: [112.7521, -7.2575],
    count: 187,
    region: "Java",
    color: "var(--color-ultramarine)",
  },
  {
    name: "Bandung",
    coords: [107.6098, -6.9175],
    count: 138,
    region: "Java",
    color: "var(--color-jade)",
  },
  {
    name: "Bali",
    coords: [115.2126, -8.6705],
    count: 96,
    region: "Bali",
    color: "var(--color-magenta)",
  },
  {
    name: "Medan",
    coords: [98.6722, 3.5952],
    count: 124,
    region: "Sumatera",
    color: "var(--color-sand)",
  },
  {
    name: "Makassar",
    coords: [119.4327, -5.1477],
    count: 78,
    region: "Sulawesi",
    color: "var(--color-cinnabar)",
  },
] as const;

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const MAX_COUNT = Math.max(...CITIES.map((c) => c.count));

export function Locations() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-carbon)",
        color: "var(--color-kapur)",
      }}
      id="locations"
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
                №05 — Locations
              </span>
            </div>
          </div>
          <div className="md:col-span-8">
            <h2
              className="font-display tracking-[-0.035em]"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                lineHeight: 0.98,
                fontWeight: 300,
                fontVariationSettings: '"opsz" 144, "SOFT" 100',
              }}
            >
              From Sumatera to{" "}
              <span
                className="text-cinnabar"
                style={{
                  fontStyle: "italic",
                  fontVariationSettings:
                    '"opsz" 144, "SOFT" 100, "WONK" 1',
                }}
              >
                Sulawesi.
              </span>
            </h2>
            <p
              className="mt-6 max-w-xl text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(244,239,230,0.65)" }}
            >
              A live map of the cities we operate in — billboards, videotrons,
              neonbox, and pedestrian bridges across six metros.
            </p>
          </div>
        </header>

        <Reveal delay={0.1}>
          <div className="mt-12 md:mt-16">
            <MapView />
          </div>
        </Reveal>

        <CityChart />
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
      zoom: 4.4,
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
    <div
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-carbon-soft)",
        outline: "1px solid var(--color-cinnabar)",
        outlineOffset: "-1px",
      }}
    >
      <div
        ref={containerRef}
        className="h-[440px] w-full md:h-[600px] lg:h-[680px]"
        aria-label="Map of locations across Indonesia"
      />
      {!TOKEN && <MapFallback />}

      {/* Decorative corners */}
      <Corner position="tl" />
      <Corner position="tr" />
      <Corner position="bl" />
      <Corner position="br" />
    </div>
  );
}

function Corner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const isLeft = position[1] === "l";
  const isTop = position[0] === "t";
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute z-10 h-4 w-4"
      style={{
        [isTop ? "top" : "bottom"]: "8px",
        [isLeft ? "left" : "right"]: "8px",
        [isTop ? "borderTop" : "borderBottom"]:
          "1.5px solid var(--color-cinnabar)",
        [isLeft ? "borderLeft" : "borderRight"]:
          "1.5px solid var(--color-cinnabar)",
      }}
    />
  );
}

function MapFallback() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-8"
      style={{ backgroundColor: "var(--color-carbon)" }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 40%, rgb(242 93 39 / 0.18), transparent 70%)",
        }}
      />
      <div className="relative max-w-md text-center">
        <p
          className="font-mono text-[10px] uppercase tracking-[0.28em]"
          style={{ color: "var(--color-cinnabar)" }}
        >
          Map unavailable
        </p>
        <p
          className="mt-4 font-display text-2xl tracking-[-0.02em] md:text-3xl"
          style={{
            color: "var(--color-kapur)",
            fontWeight: 400,
            fontVariationSettings: '"opsz" 144, "SOFT" 100',
          }}
        >
          Set{" "}
          <code
            className="text-cinnabar"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            NEXT_PUBLIC_MAPBOX_TOKEN
          </code>{" "}
          to enable the live map.
        </p>
        <p className="mt-4 text-sm" style={{ color: "rgba(244,239,230,0.65)" }}>
          Six cities, 1.000+ locations across Indonesia — Jakarta, Surabaya,
          Bandung, Bali, Medan, Makassar.
        </p>
      </div>
    </div>
  );
}

function CityChart() {
  const reduced = useReducedMotion();
  return (
    <div className="mt-12 md:mt-16">
      <div
        className="mb-6 flex items-center justify-between border-b pb-3 font-mono text-[10px] uppercase tracking-[0.24em]"
        style={{
          borderColor: "rgba(244,239,230,0.16)",
          color: "rgba(244,239,230,0.55)",
        }}
      >
        <span>City · Region · Locations</span>
        <span>Sorted by inventory</span>
      </div>

      <ul className="flex flex-col">
        {CITIES.map((c, i) => {
          const pct = (c.count / MAX_COUNT) * 100;
          return (
            <motion.li
              key={c.name}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative grid grid-cols-12 items-center gap-3 border-b py-4 md:py-5"
              style={{ borderColor: "rgba(244,239,230,0.10)" }}
            >
              <span
                className="col-span-1 font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: "rgba(244,239,230,0.45)" }}
              >
                №0{i + 1}
              </span>
              <span
                className="col-span-3 font-display text-2xl md:col-span-2 md:text-3xl"
                style={{
                  color: "var(--color-kapur)",
                  fontWeight: 400,
                  fontVariationSettings: '"opsz" 144, "SOFT" 100',
                }}
              >
                {c.name}
              </span>
              <span
                className="col-span-3 font-mono text-[10px] uppercase tracking-[0.22em] md:col-span-2"
                style={{ color: "rgba(244,239,230,0.55)" }}
              >
                {c.region}
              </span>
              <div className="col-span-4 hidden md:col-span-5 md:block">
                <motion.div
                  className="h-px origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: pct / 100 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.08 + 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ backgroundColor: c.color, height: "2px" }}
                />
              </div>
              <span
                className="col-span-5 text-right font-mono text-sm tabular-nums md:col-span-2"
                style={{ color: c.color }}
              >
                {c.count}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
