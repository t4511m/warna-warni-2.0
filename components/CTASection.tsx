"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

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
    <section className="bg-mist text-ink" id="contact">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:gap-16 md:px-10 md:py-32 lg:px-12">
        <Reveal>
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Get in touch
              </p>
              <h2
                className="mt-4 font-semibold tracking-[-0.025em] text-ink"
                style={{
                  fontSize: "clamp(2.25rem, 5vw, 4rem)",
                  lineHeight: 1.05,
                  fontWeight: 700,
                }}
              >
                Ready to be seen by{" "}
                <span className="text-accent">millions?</span>
              </h2>
              <p className="mt-5 max-w-md text-base text-muted md:text-lg">
                Tell us about your campaign — we&apos;ll come back within one
                business day with a tailored proposal.
              </p>
            </div>

            <ul className="flex flex-col gap-4">
              <ContactRow
                label="Email"
                value="hello@ww-demo.id"
                href="mailto:hello@ww-demo.id"
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
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-3xl bg-paper p-6 shadow-card md:p-8"
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
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-base font-medium text-paper hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  transition:
                    "transform var(--duration-base) var(--ease-out-quint)",
                }}
              >
                {submitting ? "Sending…" : "Send proposal request"}
              </button>

              {status.kind === "success" && (
                <p className="mt-4 text-sm font-medium text-ink">
                  Thanks — your request is in. We&apos;ll be in touch within a
                  business day.
                </p>
              )}
              {status.kind === "error" && (
                <p className="mt-4 text-sm text-accent">{status.message}</p>
              )}
            </fieldset>
          </form>
        </Reveal>
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
    <div className="flex items-baseline gap-4 border-b border-ink/8 py-3">
      <span className="w-24 shrink-0 text-xs font-medium uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      <span className="text-base font-medium text-ink md:text-lg">
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
      <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-ink/10 bg-paper px-4 py-3 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10"
        style={{
          transition:
            "border-color var(--duration-fast) var(--ease-out-quint), box-shadow var(--duration-fast) var(--ease-out-quint)",
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
      <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
        {label}
      </span>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-xl border border-ink/10 bg-paper px-4 py-3 text-base text-ink focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'><path d='M3 5l3 3 3-3' stroke='%231D1D1F' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 14px center",
          paddingRight: "2.5rem",
          transition:
            "border-color var(--duration-fast) var(--ease-out-quint), box-shadow var(--duration-fast) var(--ease-out-quint)",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-paper text-ink">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
