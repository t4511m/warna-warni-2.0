import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { HeroMain } from "@/components/HeroMain";
import { LazyLocations } from "@/components/LazyLocations";
import { LogoMarquee } from "@/components/LogoMarquee";
import { News } from "@/components/News";
import { Products } from "@/components/Products";
import { Solutions } from "@/components/Solutions";
import { Stats } from "@/components/Stats";
import { DisplayTicker, Ticker } from "@/components/Ticker";

const STATS_TO_PRODUCTS = [
  "Five formats",
  "Six cities",
  "One network",
  "Since 1972",
];

const SOLUTIONS_TO_LOCATIONS = [
  "Survey",
  "Permits",
  "Production",
  "Install",
  "Measurement",
];

const NEWS_TICKER = [
  "Now booking Q3 · 2026",
  "Network expansion: Bali · Sunset Road",
  "Audited impressions standard",
  "New videotron · Thamrin · Live",
];

export default function Home() {
  return (
    <>
      <HeroMain />
      <Stats />
      <DisplayTicker items={STATS_TO_PRODUCTS} variant="ink" speed="slow" />
      <Products />
      <Solutions />
      <Ticker
        items={SOLUTIONS_TO_LOCATIONS}
        variant="cinnabar"
        size="md"
        speed="fast"
      />
      <LazyLocations />
      <LogoMarquee />
      <CTASection />
      <Ticker items={NEWS_TICKER} variant="ink" size="sm" speed="mid" border />
      <News />
      <Footer />
    </>
  );
}
