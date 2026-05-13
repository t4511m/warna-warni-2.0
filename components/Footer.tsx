"use client";

import Link from "next/link";
import { DisplayTicker } from "@/components/Ticker";

const PRODUCT_LINKS = [
  { href: "#inventory", label: "Billboard" },
  { href: "#inventory", label: "Videotron LED" },
  { href: "#inventory", label: "Neonbox" },
  { href: "#inventory", label: "Megatron" },
  { href: "#inventory", label: "Jembatan Penyeberangan" },
];

const COMPANY_LINKS = [
  { href: "#about", label: "About" },
  { href: "#solutions", label: "Solutions" },
  { href: "#journal", label: "Journal" },
  { href: "#careers", label: "Careers" },
  { href: "#contact", label: "Contact" },
];

const CITY_LINKS = [
  { href: "#locations", label: "Jakarta" },
  { href: "#locations", label: "Surabaya" },
  { href: "#locations", label: "Bandung" },
  { href: "#locations", label: "Bali" },
  { href: "#locations", label: "Medan" },
  { href: "#locations", label: "Makassar" },
];

const SOCIAL_LINKS = [
  { href: "#instagram", label: "Instagram", glyph: InstagramGlyph },
  { href: "#linkedin", label: "LinkedIn", glyph: LinkedInGlyph },
  { href: "#twitter", label: "X", glyph: XGlyph },
];

const FOOTER_TICKER = [
  "Warna Warni",
  "Out of Home",
  "Indonesia",
  "Est. 1972",
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "var(--color-carbon)",
        color: "var(--color-kapur)",
      }}
    >
      <DisplayTicker items={FOOTER_TICKER} variant="carbon" speed="slow" />

      <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-10 md:px-8 md:pt-20 md:pb-12">
        <div
          className="grid gap-12 border-t pt-16 md:grid-cols-12 md:gap-8 md:pt-20"
          style={{ borderColor: "rgba(244,239,230,0.18)" }}
        >
          <div className="md:col-span-4">
            <Link
              href="/"
              className="flex items-baseline gap-2 leading-none"
              data-cursor="grow"
            >
              <span
                className="font-display"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontVariationSettings: '"opsz" 144, "SOFT" 100',
                  color: "var(--color-kapur)",
                  fontWeight: 400,
                  letterSpacing: "-0.03em",
                }}
              >
                Warna
              </span>
              <span
                className="font-display"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontStyle: "italic",
                  fontVariationSettings:
                    '"opsz" 144, "SOFT" 100, "WONK" 1',
                  color: "var(--color-cinnabar)",
                  fontWeight: 400,
                  letterSpacing: "-0.03em",
                }}
              >
                Warni
              </span>
            </Link>
            <p
              className="mt-6 max-w-xs text-base leading-relaxed"
              style={{ color: "rgba(244,239,230,0.65)" }}
            >
              An out-of-home advertising network across six Indonesian cities —
              billboards, videotrons, neonbox, and pedestrian bridges.
            </p>
            <ul className="mt-8 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ href, label, glyph: Glyph }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    data-cursor="grow"
                    className="group inline-flex h-11 w-11 items-center justify-center border"
                    style={{
                      borderColor: "rgba(244,239,230,0.30)",
                      color: "rgba(244,239,230,0.85)",
                      transition:
                        "background-color var(--duration-base) var(--ease-out-quint), color var(--duration-base) var(--ease-out-quint), border-color var(--duration-base) var(--ease-out-quint)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--color-cinnabar)";
                      e.currentTarget.style.borderColor = "var(--color-cinnabar)";
                      e.currentTarget.style.color = "var(--color-kapur)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.borderColor = "rgba(244,239,230,0.30)";
                      e.currentTarget.style.color = "rgba(244,239,230,0.85)";
                    }}
                  >
                    <Glyph />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn
            title="Inventory"
            links={PRODUCT_LINKS}
            className="md:col-span-3"
          />
          <FooterColumn
            title="Company"
            links={COMPANY_LINKS}
            className="md:col-span-2"
          />
          <FooterColumn
            title="Cities"
            links={CITY_LINKS}
            className="md:col-span-3"
          />
        </div>

        <div
          className="mt-16 flex flex-col gap-4 border-t pt-6 font-mono text-[10px] uppercase tracking-[0.24em] md:flex-row md:items-center md:justify-between"
          style={{
            borderColor: "rgba(244,239,230,0.18)",
            color: "rgba(244,239,230,0.55)",
          }}
        >
          <p>© {year} Warna Warni · All rights reserved</p>
          <ul className="flex flex-wrap gap-6">
            <li>
              <Link
                href="#privacy"
                className="link-underline"
                data-cursor="grow"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="#terms"
                className="link-underline"
                data-cursor="grow"
              >
                Terms
              </Link>
            </li>
            <li>
              <Link
                href="#cookies"
                className="link-underline"
                data-cursor="grow"
              >
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <p
        className="font-mono text-[10px] uppercase tracking-[0.28em]"
        style={{ color: "var(--color-cinnabar)" }}
      >
        {title}
      </p>
      <ul className="mt-6 space-y-3 text-base">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              data-cursor="grow"
              className="link-underline inline-block"
              style={{
                color: "rgba(244,239,230,0.85)",
                transition: "color var(--duration-fast) var(--ease-out-quint)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-cinnabar)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(244,239,230,0.85)")
              }
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InstagramGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedInGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5c0 1.38-1.11 2.5-2.49 2.5S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM.22 8h4.54v14H.22V8zm7.32 0H12v1.91h.06c.62-1.18 2.13-2.43 4.39-2.43 4.7 0 5.55 3.09 5.55 7.11V22h-4.55v-6.55c0-1.56-.03-3.57-2.18-3.57-2.18 0-2.51 1.7-2.51 3.45V22H7.54V8z" />
    </svg>
  );
}

function XGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
