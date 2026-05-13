"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#inventory", label: "Inventory", index: "01" },
  { href: "#solutions", label: "Solutions", index: "02" },
  { href: "#locations", label: "Locations", index: "03" },
  { href: "#journal", label: "Journal", index: "04" },
] as const;

const CTA = { href: "#contact", label: "Talk to us" } as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      setTime(`JKT · ${hh}:${mm}`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header
        data-scrolled={scrolled}
        className="fixed inset-x-0 top-0 z-40 animate-nav-fade"
        style={{
          backgroundColor: scrolled
            ? "rgba(244, 239, 230, 0.78)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--color-line)"
            : "1px solid transparent",
          transitionProperty:
            "background-color, backdrop-filter, border-color",
          transitionDuration: "var(--duration-base)",
          transitionTimingFunction: "var(--ease-out-quint)",
        }}
      >
        {/* Top mono utility row */}
        <div
          className="hidden items-center justify-between border-b px-5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] md:flex md:px-8"
          style={{
            borderColor: "var(--color-line-soft)",
            color: "var(--color-graphite)",
          }}
        >
          <span className="flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full"
              style={{ backgroundColor: "var(--color-cinnabar)" }}
            />
            Live network · 1.000+ locations
          </span>
          <span>{time}</span>
        </div>

        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 md:px-8 md:py-4">
          <Link
            href="/"
            aria-label="Warna Warni — home"
            className="group flex items-baseline gap-2 leading-none"
          >
            <span
              className="font-display text-2xl tracking-[-0.03em] md:text-[1.65rem]"
              style={{
                fontVariationSettings: '"opsz" 144, "SOFT" 100',
                color: "var(--color-carbon)",
                fontWeight: 400,
              }}
            >
              Warna
            </span>
            <span
              className="font-display text-2xl tracking-[-0.03em] md:text-[1.65rem]"
              style={{
                fontStyle: "italic",
                fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
                color: "var(--color-cinnabar)",
                fontWeight: 400,
              }}
            >
              Warni
            </span>
            <span
              className="hidden font-mono text-[9px] uppercase tracking-[0.24em] md:inline"
              style={{ color: "var(--color-smoke)" }}
            >
              ®/72
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 md:flex"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium"
                style={{
                  color: "var(--color-carbon)",
                  transition:
                    "color var(--duration-fast) var(--ease-out-quint)",
                }}
              >
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.22em]"
                  style={{ color: "var(--color-cinnabar)" }}
                >
                  {l.index}
                </span>
                <span className="link-underline">{l.label}</span>
              </Link>
            ))}
            <Link
              href={CTA.href}
              className="ml-3 inline-flex items-center gap-2 rounded-none border px-5 py-2.5 text-sm font-medium"
              style={{
                backgroundColor: "var(--color-carbon)",
                color: "var(--color-kapur)",
                borderColor: "var(--color-carbon)",
                transition:
                  "background-color var(--duration-base) var(--ease-out-quint), color var(--duration-base) var(--ease-out-quint)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--color-cinnabar)";
                e.currentTarget.style.borderColor = "var(--color-cinnabar)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-carbon)";
                e.currentTarget.style.borderColor = "var(--color-carbon)";
              }}
            >
              {CTA.label}
              <span aria-hidden>↗</span>
            </Link>
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((s) => !s)}
            className="-mr-1 inline-flex h-11 w-11 items-center justify-center md:hidden"
            style={{ color: "var(--color-carbon)" }}
          >
            <Burger open={open} />
          </button>
        </div>
      </header>

      <MobileDropdown open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function Burger({ open }: { open: boolean }) {
  const ease = "var(--ease-out-quint)";
  return (
    <span aria-hidden className="relative block h-3.5 w-6">
      <span
        className="absolute left-0 right-0 mx-auto block h-px w-6"
        style={{
          backgroundColor: "currentColor",
          top: open ? "50%" : "0",
          transform: open ? "translateY(-50%) rotate(45deg)" : "none",
          transition: `top var(--duration-fast) ${ease}, transform var(--duration-base) ${ease}`,
        }}
      />
      <span
        className="absolute left-0 right-0 mx-auto block h-px w-6"
        style={{
          backgroundColor: "currentColor",
          bottom: open ? "50%" : "0",
          transform: open ? "translateY(50%) rotate(-45deg)" : "none",
          transition: `bottom var(--duration-fast) ${ease}, transform var(--duration-base) ${ease}`,
        }}
      />
    </span>
  );
}

function MobileDropdown({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div className="md:hidden" id="mobile-nav">
      <div
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 z-20"
        style={{
          pointerEvents: open ? "auto" : "none",
          backgroundColor: open ? "rgba(10,10,10,0.4)" : "transparent",
          transition:
            "background-color var(--duration-base) var(--ease-out-quint)",
        }}
      />

      <aside
        role="dialog"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        className="fixed inset-x-0 top-0 z-30"
        style={{
          backgroundColor: "var(--color-kapur)",
          borderBottom: "1px solid var(--color-line)",
          transform: open ? "translateY(0)" : "translateY(-100%)",
          transition:
            "transform var(--duration-slow) var(--ease-out-quint), box-shadow var(--duration-slow) var(--ease-out-quint)",
          boxShadow: open
            ? "0 24px 48px -16px rgba(10,10,10,0.20)"
            : "none",
        }}
      >
        <div className="flex flex-col gap-1 px-6 pb-10 pt-24">
          {NAV_LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              tabIndex={open ? 0 : -1}
              className="group flex items-baseline gap-3 border-b py-4 font-display text-4xl tracking-[-0.025em]"
              style={{
                borderColor: "var(--color-line)",
                color: "var(--color-carbon)",
                fontVariationSettings: '"opsz" 144, "SOFT" 100',
                fontWeight: 400,
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(8px)",
                transition: `opacity var(--duration-slow) var(--ease-out-quint) ${i * 50}ms, transform var(--duration-slow) var(--ease-out-quint) ${i * 50}ms`,
              }}
            >
              <span
                className="font-mono text-[10px] uppercase tracking-[0.24em]"
                style={{ color: "var(--color-cinnabar)" }}
              >
                — №{l.index}
              </span>
              <span>{l.label}</span>
            </Link>
          ))}
          <Link
            href={CTA.href}
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            className="mt-8 inline-flex items-center justify-between px-6 py-4 text-base font-medium"
            style={{
              backgroundColor: "var(--color-carbon)",
              color: "var(--color-kapur)",
            }}
          >
            <span>{CTA.label}</span>
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </aside>
    </div>
  );
}
