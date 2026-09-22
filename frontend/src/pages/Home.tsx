import { Hero } from "@/components/home/Hero";
import { OfferBanner } from "@/components/home/OfferBanner";
import { RoomCards } from "@/components/home/RoomCards";
import { Faq, Features, Gallery, Relax } from "@/components/home/Sections";
import { Reveal } from "@/components/motion/Reveal";

export function Home() {
  return (
    <main>
      <Hero />
      <Reveal className="relative z-10 mx-auto w-full max-w-7xl px-4 md:-mt-24 md:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-6">
          <div className="min-w-0 flex-1">
            <RoomCards variant="compact" />
          </div>
          <aside className="flex w-full flex-col justify-center gap-4 rounded-[1.75rem] bg-card p-6 ring-1 ring-foreground/5 lg:w-80 lg:shrink-0 lg:p-8">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-2xl leading-snug font-semibold">
                Pengalaman Rimba Haven
              </h2>
              <span
                aria-hidden="true"
                className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-forest-900 text-cream-50"
              >
                <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 12L12 4M6 4h6v6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Menginap tenang dengan layanan yang membuat kamu melambat, memulihkan diri, dan
              pulang membawa rasa ringan dari rimba.
            </p>
            <p className="text-sm font-medium text-forest-700">Bogor, Jawa Barat</p>
          </aside>
        </div>
      </Reveal>
      <Relax />
      <Features />
      <OfferBanner />
      <div className="pt-4 md:pt-6">
        <Faq />
      </div>
      <Gallery />
    </main>
  );
}
