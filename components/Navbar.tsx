"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#journal", label: "Journal" },
  { href: "#contact", label: "Contact" },
] as const;

const CTA = { href: "#contact", label: "Start a project" } as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
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
        className="fixed inset-x-0 top-0 z-40 border-b border-transparent data-[scrolled=true]:border-ink/8 data-[scrolled=true]:bg-paper/78 data-[scrolled=true]:backdrop-blur-md data-[scrolled=true]:shadow-sm"
        style={{
          transitionProperty: "background-color, backdrop-filter, border-color, box-shadow",
          transitionDuration: "var(--duration-base)",
          transitionTimingFunction: "var(--ease-out-quint)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 md:px-6 md:py-3">
          <Link
            href="/"
            aria-label="warna-warni — home"
            className="font-display text-2xl leading-none tracking-tight text-ink md:text-[28px]"
          >
            warna-warni
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-ink/80 hover:text-ink"
                style={{
                  transition: "color var(--duration-fast) var(--ease-out-quint)",
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={CTA.href}
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-paper hover:-translate-y-px hover:shadow-glow"
              style={{
                transition:
                  "transform var(--duration-fast) var(--ease-out-quint), box-shadow var(--duration-base) var(--ease-out-quint)",
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

      <MobilePanel open={open} onClose={() => setOpen(false)} />
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

function MobilePanel({
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
        className={`fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{
          transition: "opacity var(--duration-base) var(--ease-out-quint)",
        }}
      />
      <aside
        role="dialog"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        className="fixed inset-y-0 right-0 z-50 flex w-[82%] max-w-sm flex-col gap-8 bg-paper p-6 shadow-xl"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform var(--duration-slow) var(--ease-out-quint)",
        }}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl tracking-tight text-ink">
            warna-warni
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="-mr-1 inline-flex h-10 w-10 items-center justify-center text-ink"
          >
            <Burger open />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              tabIndex={open ? 0 : -1}
              className="font-display text-3xl text-ink hover:text-accent"
              style={{
                transition: "color var(--duration-fast) var(--ease-out-quint)",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href={CTA.href}
          onClick={onClose}
          tabIndex={open ? 0 : -1}
          className="mt-auto inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-base font-medium text-paper shadow-sm hover:shadow-glow"
          style={{
            transition: "box-shadow var(--duration-base) var(--ease-out-quint)",
          }}
        >
          {CTA.label}
        </Link>
      </aside>
    </div>
  );
}
