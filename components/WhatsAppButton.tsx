"use client";

import { useState } from "react";

const WHATSAPP_E164 = "6281234567890";
const WHATSAPP_MESSAGE = "Halo Warna Warni, saya tertarik dengan layanan OOH.";

export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const href = `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      data-cursor="grow"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group fixed bottom-5 right-5 z-50 inline-flex animate-wa-enter items-center md:bottom-8 md:right-8"
      style={{
        transition: "transform var(--duration-base) var(--ease-out-quint)",
      }}
    >
      <span
        className="relative inline-flex items-center overflow-hidden"
        style={{
          backgroundColor: "var(--color-carbon)",
          color: "var(--color-kapur)",
          boxShadow:
            "0 2px 8px rgba(10,10,10,0.16), 0 16px 40px -16px rgba(10,10,10,0.30)",
        }}
      >
        <span
          aria-hidden
          className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center md:h-16 md:w-16"
          style={{ backgroundColor: "#25D366", color: "#0a0a0a" }}
        >
          <span
            aria-hidden
            className="absolute inset-0 -z-0"
            style={{
              backgroundColor: "#25D366",
              opacity: 0.5,
              animation: "marker-pulse 2.4s var(--ease-out-quint) infinite",
              borderRadius: "9999px",
            }}
          />
          <span className="relative">
            <WhatsAppGlyph />
          </span>
        </span>
        <span
          className="overflow-hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.24em]"
          style={{
            maxWidth: hovered ? "11rem" : "0",
            paddingLeft: hovered ? "1rem" : "0",
            paddingRight: hovered ? "1.25rem" : "0",
            transition:
              "max-width var(--duration-slow) var(--ease-out-quint), padding var(--duration-slow) var(--ease-out-quint)",
          }}
        >
          Chat di WhatsApp
        </span>
      </span>
    </a>
  );
}

function WhatsAppGlyph() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.991 2.898 9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  );
}
