"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { MagneticButton } from "@/components/MagneticButton";

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
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headlineX = useTransform(scrollYProgress, [0, 1], [-40, 40]);

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
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "var(--color-cinnabar)",
        color: "var(--color-kapur)",
      }}
      id="contact"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-8 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10"
                style={{ backgroundColor: "var(--color-kapur)" }}
              />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.28em]"
                style={{ color: "var(--color-kapur)" }}
              >
                №07 — Get in touch
              </span>
            </div>

            <motion.h2
              style={
                reduced ? undefined : { x: headlineX }
              }
              className="mt-8 font-display tracking-[-0.04em]"
            >
              <span
                className="block"
                style={{
                  fontSize: "clamp(2.75rem, 7vw, 6.5rem)",
                  lineHeight: 0.95,
                  fontWeight: 300,
                  fontVariationSettings: '"opsz" 144, "SOFT" 100',
                  color: "var(--color-kapur)",
                }}
              >
                Ready to be
              </span>
              <span
                className="block"
                style={{
                  fontSize: "clamp(2.75rem, 7vw, 6.5rem)",
                  lineHeight: 0.95,
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontVariationSettings:
                    '"opsz" 144, "SOFT" 100, "WONK" 1',
                  color: "var(--color-carbon)",
                }}
              >
                seen by millions?
              </span>
            </motion.h2>
            <p className="mt-8 max-w-md text-base leading-relaxed md:text-lg">
              Tell us about your campaign — we&apos;ll come back within one
              business day with a tailored proposal.
            </p>

            <ul
              className="mt-12 flex flex-col"
              style={{ borderTop: "1px solid rgba(244,239,230,0.30)" }}
            >
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

          <div className="md:col-span-7">
            <form
              onSubmit={onSubmit}
              noValidate
              className="relative p-6 md:p-10"
              style={{
                backgroundColor: "var(--color-carbon)",
                color: "var(--color-kapur)",
              }}
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-2 w-full"
                style={{ backgroundColor: "var(--color-cinnabar)" }}
              />
              <div className="mb-8 flex items-center justify-between border-b pb-4 font-mono text-[10px] uppercase tracking-[0.24em]"
                style={{ borderColor: "rgba(244,239,230,0.16)", color: "rgba(244,239,230,0.55)" }}
              >
                <span>Form · Lead Intake</span>
                <span>v.24.03</span>
              </div>

              <fieldset disabled={submitting} className="contents">
                <div className="grid gap-5 md:grid-cols-2">
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

                <MagneticButton pull={0.25} className="mt-8 inline-block w-full">
                  <button
                    type="submit"
                    data-cursor="grow"
                    className="group inline-flex w-full items-center justify-between gap-2 px-7 py-5 text-base font-medium disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                      backgroundColor: "var(--color-cinnabar)",
                      color: "var(--color-kapur)",
                      transition:
                        "background-color var(--duration-base) var(--ease-out-quint)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--color-kapur)";
                      e.currentTarget.style.color = "var(--color-carbon)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--color-cinnabar)";
                      e.currentTarget.style.color = "var(--color-kapur)";
                    }}
                  >
                    <span>
                      {submitting ? "Sending…" : "Send proposal request"}
                    </span>
                    <span aria-hidden>↗</span>
                  </button>
                </MagneticButton>

                {status.kind === "success" && (
                  <p
                    className="mt-5 border-l-2 pl-4 text-sm"
                    style={{
                      borderColor: "var(--color-cinnabar)",
                      color: "var(--color-kapur)",
                    }}
                  >
                    Thanks — your request is in. We&apos;ll be in touch within a
                    business day.
                  </p>
                )}
                {status.kind === "error" && (
                  <p
                    className="mt-5 border-l-2 pl-4 text-sm"
                    style={{
                      borderColor: "var(--color-cinnabar)",
                      color: "var(--color-cinnabar)",
                    }}
                  >
                    {status.message}
                  </p>
                )}
              </fieldset>
            </form>
          </div>
        </div>
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
    <div
      className="flex items-baseline gap-4 border-b py-4"
      style={{ borderColor: "rgba(244,239,230,0.30)" }}
    >
      <span
        className="w-24 shrink-0 font-mono text-[10px] uppercase tracking-[0.24em]"
        style={{ color: "rgba(244,239,230,0.65)" }}
      >
        {label}
      </span>
      <span
        className="text-base md:text-lg"
        style={{ color: "var(--color-kapur)" }}
      >
        {value}
      </span>
    </div>
  );
  return href ? (
    <li>
      <a
        href={href}
        data-cursor="grow"
        className="block transition-colors"
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-carbon)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "")}
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
    <label className="flex flex-col gap-2 text-sm">
      <span
        className="font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: "rgba(244,239,230,0.55)" }}
      >
        {label}
        {required && <span style={{ color: "var(--color-cinnabar)" }}> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-0 border-b bg-transparent px-0 py-2.5 text-base focus:outline-none"
        style={{
          borderColor: "rgba(244,239,230,0.30)",
          color: "var(--color-kapur)",
          transition:
            "border-color var(--duration-fast) var(--ease-out-quint)",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-cinnabar)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "rgba(244,239,230,0.30)")
        }
      />
      {error && (
        <span className="text-xs" style={{ color: "var(--color-cinnabar)" }}>
          {error}
        </span>
      )}
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
    <label className="flex flex-col gap-2 text-sm">
      <span
        className="font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: "rgba(244,239,230,0.55)" }}
      >
        {label}
      </span>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none border-0 border-b bg-transparent px-0 py-2.5 pr-10 text-base focus:outline-none"
        style={{
          borderColor: "rgba(244,239,230,0.30)",
          color: "var(--color-kapur)",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'><path d='M3 5l3 3 3-3' stroke='%23F4EFE6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0 center",
          transition:
            "border-color var(--duration-fast) var(--ease-out-quint)",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-cinnabar)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "rgba(244,239,230,0.30)")
        }
      >
        {options.map((o) => (
          <option
            key={o.value}
            value={o.value}
            style={{
              backgroundColor: "var(--color-carbon)",
              color: "var(--color-kapur)",
            }}
          >
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
