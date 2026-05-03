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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Link
              href="/"
              className="font-display text-3xl tracking-tight text-paper md:text-4xl"
            >
              warna-warni
            </Link>
            <p className="mt-6 max-w-xs text-base text-paper/65">
              Out-of-home, made colorful. Six cities, one network — billboards,
              videotrons, neonbox, and bridges across Indonesia.
            </p>
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

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/10 pt-6 text-xs text-paper/45 md:flex-row md:items-center md:justify-between">
          <p>© {year} warna-warni. All rights reserved.</p>
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
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/45">
        {title}
      </p>
      <ul className="mt-5 space-y-2.5 text-sm text-paper/75">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="hover:text-accent"
              style={{
                transition: "color var(--duration-fast) var(--ease-out-quint)",
              }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
