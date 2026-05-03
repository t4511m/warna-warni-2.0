import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { HeroMain } from "@/components/HeroMain";
import { LazyLocations } from "@/components/LazyLocations";
import { LogoMarquee } from "@/components/LogoMarquee";
import { News } from "@/components/News";
import { Products } from "@/components/Products";
import { Solutions } from "@/components/Solutions";
import { Stats } from "@/components/Stats";

export default function Home() {
  return (
    <>
      <HeroMain />
      <Stats />
      <Products />
      <Solutions />
      <LazyLocations />
      <LogoMarquee />
      <CTASection />
      <News />
      <Footer />
    </>
  );
}
