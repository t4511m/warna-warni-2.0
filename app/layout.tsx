import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { BackToTop } from "@/components/BackToTop";
import { Cursor } from "@/components/Cursor";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Warna Warni — Out-of-home, in living color",
  description:
    "An out-of-home advertising network across six Indonesian cities — billboards, videotrons, neonbox, pedestrian bridges. Bold formats, full coverage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${instrument.variable} ${jetbrains.variable} paper-grain antialiased`}
      >
        <Cursor />
        <Navbar />
        <main className="relative z-[2]">{children}</main>
        <BackToTop />
        <WhatsAppButton />
      </body>
    </html>
  );
}
