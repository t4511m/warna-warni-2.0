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
    <section className="bg-paper py-10 md:py-14" aria-label="Selected clients">
      <p className="px-4 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-ink/50 md:px-10">
        Trusted by brands across Indonesia
      </p>
      <div className="mt-6 overflow-hidden">
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
          className="flex items-center gap-12 px-8 font-display text-3xl tracking-tight text-ink/35 md:text-4xl"
        >
          <span>{c}</span>
        </li>
      ))}
    </ul>
  );
}
