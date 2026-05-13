"use client";

import { Marquee } from "@/components/Marquee";

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

const CLIENTS_REV = [
  "Sampoerna",
  "Wings Group",
  "Mayora",
  "Sinar Mas",
  "Lion Air",
  "Bluebird",
  "Ovo",
  "DANA",
  "Indomaret",
  "Alfamart",
  "ASUS",
  "Samsung",
] as const;

export function LogoMarquee() {
  return (
    <section
      className="relative"
      style={{ backgroundColor: "var(--color-kapur)" }}
      aria-label="Selected clients"
    >
      <div className="mx-auto max-w-[1400px] px-6 pt-20 md:px-8 md:pt-28">
        <div className="grid gap-8 md:grid-cols-12">
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
                №06 — Trusted by
              </span>
            </div>
          </div>
          <div className="md:col-span-8">
            <h2
              className="font-display tracking-[-0.035em]"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 4rem)",
                lineHeight: 1,
                color: "var(--color-carbon)",
                fontWeight: 300,
                fontVariationSettings: '"opsz" 144, "SOFT" 100',
              }}
            >
              Half a century of{" "}
              <span
                className="text-cinnabar"
                style={{
                  fontStyle: "italic",
                  fontVariationSettings:
                    '"opsz" 144, "SOFT" 100, "WONK" 1',
                }}
              >
                household names.
              </span>
            </h2>
          </div>
        </div>
      </div>

      <div className="mt-14 md:mt-16">
        <Marquee speed="slow" fade>
          <ul className="flex shrink-0 items-center">
            {CLIENTS.map((c) => (
              <li
                key={c}
                className="flex items-center gap-12 px-6 md:px-10"
                style={{
                  fontFamily: "var(--font-display)",
                  fontVariationSettings: '"opsz" 144, "SOFT" 100',
                  fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.035em",
                  color: "var(--color-carbon)",
                }}
              >
                <span>{c}</span>
                <span
                  aria-hidden
                  className="text-cinnabar"
                  style={{
                    fontStyle: "italic",
                    fontVariationSettings:
                      '"opsz" 144, "SOFT" 100, "WONK" 1',
                    fontSize: "0.7em",
                  }}
                >
                  ✦
                </span>
              </li>
            ))}
          </ul>
        </Marquee>

        <Marquee speed="mid" reverse fade>
          <ul className="flex shrink-0 items-center">
            {CLIENTS_REV.map((c) => (
              <li
                key={c}
                className="flex items-center gap-12 px-6 md:px-10"
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
                  fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.025em",
                  color: "var(--color-graphite)",
                }}
              >
                <span>{c}</span>
                <span aria-hidden style={{ color: "var(--color-cinnabar)" }}>
                  ◍
                </span>
              </li>
            ))}
          </ul>
        </Marquee>
      </div>
    </section>
  );
}
