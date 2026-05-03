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

export function LogoMarquee() {
  return (
    <section
      className="bg-paper py-16 md:py-20"
      aria-label="Selected clients"
    >
      <p className="px-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted md:px-10">
        Trusted by brands across Indonesia
      </p>
      <div className="mt-8 overflow-hidden">
        <div className="flex w-max animate-marquee">
          <Track />
          <Track />
        </div>
      </div>
    </section>
  );
}

function Track() {
  return (
    <ul className="flex shrink-0 items-center">
      {CLIENTS.map((c) => (
        <li
          key={c}
          className="flex items-center gap-12 px-8 text-2xl font-semibold tracking-tight text-ink/30 md:text-3xl"
        >
          <span>{c}</span>
        </li>
      ))}
    </ul>
  );
}
