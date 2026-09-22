import { Hero } from "@/components/home/Hero";
import { OfferBanner } from "@/components/home/OfferBanner";
import { Faq, Features, Gallery, Relax } from "@/components/home/Sections";

export function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Relax />
      <OfferBanner />
      <div className="pt-20 md:pt-28">
        <Faq />
      </div>
      <Gallery />
    </main>
  );
}
