"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#inventory", label: "Inventory" },
  { href: "#solutions", label: "Solutions" },
  { href: "#locations", label: "Locations" },
  { href: "#journal", label: "Journal" },
] as const;

const CTA = { href: "#contact", label: "Talk to us" } as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <header
        data-scrolled={scrolled}
        className="fixed inset-x-0 top-0 z-40 animate-nav-fade backdrop-blur-md bg-paper/70 data-[scrolled=true]:bg-paper/85 data-[scrolled=true]:backdrop-blur-xl data-[scrolled=true]:shadow-[0_1px_0_0_rgb(0_0_0/0.04),0_10px_30px_-14px_rgb(0_0_0/0.12)]"
        style={{
          transitionProperty:
            "background-color, backdrop-filter, box-shadow",
          transitionDuration: "var(--duration-base)",
          transitionTimingFunction: "var(--ease-out-quint)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8 md:py-4">
          <Link
            href="/"
            aria-label="WW Demo — home"
            className="text-lg font-bold tracking-tight text-ink md:text-xl"
          >
            WW Demo
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 md:flex"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative text-sm font-medium text-ink/85 hover:text-ink"
                style={{
                  transition:
                    "color var(--duration-fast) var(--ease-out-quint)",
                }}
              >
                <span>{l.label}</span>
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 block h-px origin-left scale-x-0 bg-ink group-hover:scale-x-100"
                  style={{
                    transition:
                      "transform var(--duration-base) var(--ease-out-quint)",
                  }}
                />
              </Link>
            ))}
            <Link
              href={CTA.href}
              className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper hover:scale-[1.04]"
              style={{
                transition:
                  "transform var(--duration-fast) var(--ease-out-quint)",
              }}
            >
              {CTA.label}
            </Link>
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((s) => !s)}
            className="-mr-1 inline-flex h-10 w-10 items-center justify-center text-ink md:hidden"
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
  const lineBase =
    "absolute left-0 right-0 mx-auto block h-px w-5 bg-current";
  const ease = "var(--ease-out-quint)";
  return (
    <span aria-hidden className="relative block h-3 w-5">
      <span
        className={lineBase}
        style={{
          top: open ? "50%" : "0",
          transform: open ? "translateY(-50%) rotate(45deg)" : "none",
          transition: `top var(--duration-fast) ${ease}, transform var(--duration-base) ${ease}`,
        }}
      />
      <span
        className={lineBase}
        style={{
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
          backgroundColor: open ? "rgb(0 0 0 / 0.18)" : "transparent",
          transition:
            "background-color var(--duration-base) var(--ease-out-quint)",
        }}
      />

      <aside
        role="dialog"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        className="fixed inset-x-0 top-0 z-30 bg-paper/95 backdrop-blur-xl"
        style={{
          transform: open ? "translateY(0)" : "translateY(-100%)",
          transition:
            "transform var(--duration-slow) var(--ease-out-quint), box-shadow var(--duration-slow) var(--ease-out-quint)",
          boxShadow: open
            ? "0 24px 48px -16px rgb(0 0 0 / 0.16)"
            : "none",
        }}
      >
        <div className="flex flex-col gap-1 px-6 pb-8 pt-20">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              tabIndex={open ? 0 : -1}
              className="py-2 text-2xl font-semibold tracking-tight text-ink hover:text-accent"
              style={{
                transition: "color var(--duration-fast) var(--ease-out-quint)",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={CTA.href}
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-ink px-6 py-3.5 text-base font-medium text-paper hover:scale-[1.02]"
            style={{
              transition: "transform var(--duration-base) var(--ease-out-quint)",
            }}
          >
            {CTA.label}
          </Link>
        </div>
      </aside>
    </div>
  );
}
