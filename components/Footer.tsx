import Link from "next/link";

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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10 md:px-10 md:pt-24 md:pb-12 lg:px-12">
        <div className="border-t border-paper/10 pt-16 md:pt-20">
          <div className="grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <Link
                href="/"
                className="text-2xl font-bold tracking-tight text-paper md:text-3xl"
              >
                WW Demo
              </Link>
              <p className="mt-5 max-w-xs text-base leading-relaxed text-paper/65">
                A modern out-of-home network across six Indonesian cities —
                billboards, videotrons, neonbox, and pedestrian bridges.
              </p>
              <ul className="mt-8 flex items-center gap-4">
                {SOCIAL_LINKS.map(({ href, label, glyph: Glyph }) => (
                  <li key={label}>
                    <a
                      href={href}
                      aria-label={label}
                      className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper/70 hover:scale-110 hover:border-accent hover:text-accent"
                      style={{
                        transition:
                          "color var(--duration-fast) var(--ease-out-quint), border-color var(--duration-fast) var(--ease-out-quint), transform var(--duration-base) var(--ease-out-quint)",
                      }}
                    >
                      <span
                        className="inline-block group-hover:rotate-12"
                        style={{
                          transition:
                            "transform var(--duration-base) var(--ease-out-quint)",
                        }}
                      >
                        <Glyph />
                      </span>
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
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/10 pt-6 text-xs text-paper/45 md:flex-row md:items-center md:justify-between">
          <p>© {year} WW Demo. All rights reserved.</p>
          <ul className="flex flex-wrap gap-6">
            <li>
              <Link
                href="#privacy"
                className="hover:text-paper"
                style={{
                  transition:
                    "color var(--duration-fast) var(--ease-out-quint)",
                }}
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="#terms"
                className="hover:text-paper"
                style={{
                  transition:
                    "color var(--duration-fast) var(--ease-out-quint)",
                }}
              >
                Terms
              </Link>
            </li>
            <li>
              <Link
                href="#cookies"
                className="hover:text-paper"
                style={{
                  transition:
                    "color var(--duration-fast) var(--ease-out-quint)",
                }}
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
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/55">
        {title}
      </p>
      <ul className="mt-5 space-y-2.5 text-sm text-paper/75">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="group relative inline-block py-0.5 hover:text-accent"
              style={{
                transition:
                  "color var(--duration-fast) var(--ease-out-quint)",
              }}
            >
              <span>{l.label}</span>
              <span
                aria-hidden
                className="absolute -bottom-px left-0 right-0 block h-px origin-left scale-x-0 bg-accent group-hover:scale-x-100"
                style={{
                  transition:
                    "transform var(--duration-base) var(--ease-out-quint)",
                }}
              />
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
