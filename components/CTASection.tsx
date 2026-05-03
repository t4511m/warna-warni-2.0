"use client";

import { useState } from "react";

const PRODUCT_OPTIONS = [
  { value: "", label: "Select format" },
  { value: "billboard", label: "Billboard" },
  { value: "videotron", label: "Videotron LED" },
  { value: "neonbox", label: "Neonbox" },
  { value: "megatron", label: "Megatron" },
  { value: "bridge", label: "Jembatan Penyeberangan" },
  { value: "mixed", label: "Mixed network" },
] as const;

const CITY_OPTIONS = [
  { value: "", label: "Select city" },
  { value: "jakarta", label: "Jakarta" },
  { value: "surabaya", label: "Surabaya" },
  { value: "bandung", label: "Bandung" },
  { value: "bali", label: "Bali" },
  { value: "medan", label: "Medan" },
  { value: "makassar", label: "Makassar" },
  { value: "national", label: "National" },
] as const;

const BUDGET_OPTIONS = [
  { value: "", label: "Select budget (IDR)" },
  { value: "<50m", label: "Under Rp 50 jt" },
  { value: "50-200m", label: "Rp 50–200 jt" },
  { value: "200-500m", label: "Rp 200–500 jt" },
  { value: "500m-1b", label: "Rp 500 jt – 1 M" },
  { value: ">1b", label: "Rp 1 M+" },
] as const;

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  city: string;
  budget: string;
};

const INITIAL: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  product: "",
  city: "",
  budget: "",
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string; fieldErrors?: Record<string, string> };

export function CTASection() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        errors?: Record<string, string>;
      };
      if (!res.ok || !data.ok) {
        setStatus({
          kind: "error",
          message: data.error ?? "Something went wrong. Please try again.",
          fieldErrors: data.errors,
        });
        return;
      }
      setStatus({ kind: "success" });
      setForm(INITIAL);
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Check your connection and retry.",
      });
    }
  }

  const submitting = status.kind === "submitting";
  const fieldErrors = status.kind === "error" ? status.fieldErrors : undefined;

  return (
    <section className="relative bg-steel text-paper" id="contact">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(60% 40% at 20% 0%, rgb(232 50 10 / 0.25), transparent 60%), radial-gradient(40% 50% at 100% 100%, rgb(245 166 35 / 0.18), transparent 60%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:gap-16 md:px-10 md:py-28 lg:px-16">
        <div className="flex flex-col justify-between gap-12">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/60">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-paper/40" />
              Get in touch
            </p>
            <h2
              className="mt-6 font-display tracking-[-0.02em] text-paper"
              style={{
                fontWeight: 800,
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 1.02,
              }}
            >
              Ready to be seen by
              <br />
              <em className="italic text-accent">millions?</em>
            </h2>
            <p className="mt-6 max-w-md text-base text-paper/70 md:text-lg">
              Tell us about your campaign — we&apos;ll come back within one
              business day with a tailored proposal.
            </p>
          </div>

          <ul className="space-y-4 text-sm text-paper/80">
            <ContactRow
              label="Email"
              value="hello@warna-warni.id"
              href="mailto:hello@warna-warni.id"
            />
            <ContactRow
              label="Phone"
              value="+62 21 5555 0123"
              href="tel:+622155550123"
            />
            <ContactRow
              label="WhatsApp"
              value="+62 812 3456 7890"
              href="https://wa.me/6281234567890"
            />
            <ContactRow
              label="Office"
              value="Jl. Jend. Sudirman Kav. 52-53, Jakarta 12190"
            />
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="relative rounded-2xl border border-paper/15 bg-paper/[0.04] p-6 shadow-xl backdrop-blur-xl md:p-8"
        >
          <fieldset disabled={submitting} className="contents">
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Name"
                name="name"
                required
                value={form.name}
                onChange={(v) => update("name", v)}
                error={fieldErrors?.name}
              />
              <Field
                label="Company"
                name="company"
                value={form.company}
                onChange={(v) => update("company", v)}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={(v) => update("email", v)}
                error={fieldErrors?.email}
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={(v) => update("phone", v)}
              />
              <Select
                label="Product type"
                name="product"
                value={form.product}
                onChange={(v) => update("product", v)}
                options={PRODUCT_OPTIONS}
              />
              <Select
                label="City"
                name="city"
                value={form.city}
                onChange={(v) => update("city", v)}
                options={CITY_OPTIONS}
              />
              <div className="md:col-span-2">
                <Select
                  label="Budget"
                  name="budget"
                  value={form.budget}
                  onChange={(v) => update("budget", v)}
                  options={BUDGET_OPTIONS}
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-paper hover:-translate-y-px hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                transition:
                  "transform var(--duration-fast) var(--ease-out-quint), box-shadow var(--duration-base) var(--ease-out-quint)",
              }}
            >
              {submitting ? "Sending…" : "Send proposal request"}
              <Arrow />
            </button>

            {status.kind === "success" && (
              <p className="mt-4 text-sm text-accent-warm">
                Thanks — your request is in. We&apos;ll be in touch within a
                business day.
              </p>
            )}
            {status.kind === "error" && (
              <p className="mt-4 text-sm text-accent">{status.message}</p>
            )}
          </fieldset>
        </form>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-baseline gap-4 border-b border-paper/10 py-3">
      <span className="w-24 shrink-0 font-mono text-[10px] uppercase tracking-[0.24em] text-paper/45">
        {label}
      </span>
      <span className="font-display text-lg leading-tight text-paper">
        {value}
      </span>
    </div>
  );
  return href ? (
    <li>
      <a
        href={href}
        className="block hover:text-accent"
        style={{
          transition: "color var(--duration-fast) var(--ease-out-quint)",
        }}
      >
        {inner}
      </a>
    </li>
  ) : (
    <li>{inner}</li>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
  error,
}: {
  label: string;
  name: string;
  type?: "text" | "email" | "tel";
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/55">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-paper/15 bg-paper/[0.03] px-3 py-2.5 text-paper placeholder:text-paper/40 focus:border-accent focus:bg-paper/[0.06] focus:outline-none"
        style={{
          transition:
            "border-color var(--duration-fast) var(--ease-out-quint), background-color var(--duration-fast) var(--ease-out-quint)",
        }}
      />
      {error && <span className="text-xs text-accent">{error}</span>}
    </label>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/55">
        {label}
      </span>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-md border border-paper/15 bg-paper/[0.03] px-3 py-2.5 text-paper focus:border-accent focus:bg-paper/[0.06] focus:outline-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'><path d='M3 5l3 3 3-3' stroke='%23F5F2EC' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          paddingRight: "2.25rem",
          transition:
            "border-color var(--duration-fast) var(--ease-out-quint), background-color var(--duration-fast) var(--ease-out-quint)",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-steel text-paper">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
