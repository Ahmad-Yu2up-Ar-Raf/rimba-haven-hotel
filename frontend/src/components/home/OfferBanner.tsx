import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

function LeafMotif() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      className="pointer-events-none absolute -right-4 -bottom-6 size-36 text-cream-50/10 md:size-44"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M60 100C60 60 30 40 20 20c40 8 70 36 70 78-10 8-20 12-30 2z" />
      <path d="M60 100c8-28 28-48 50-58-4 36-22 60-50 70z" />
      <path d="M60 100V48" />
    </svg>
  );
}

export function OfferBanner() {
  return (
    <Reveal className="mx-auto w-full max-w-7xl px-4 md:px-8">
      <div className="relative flex flex-col gap-6 overflow-hidden rounded-[2rem] bg-forest-900 p-6 text-cream-50 md:flex-row md:items-center md:p-10">
        <LeafMotif />
        <img
          src="/assets/images/offer-spa.jpg"
          alt="Interior kabin yang hangat"
          loading="lazy"
          className="relative z-[1] h-56 w-full rounded-[1.25rem] object-cover md:h-64 md:w-2/5"
        />
        <div className="relative z-[1] flex flex-col items-start gap-3 md:pl-4">
          <span aria-hidden="true" className="h-px w-12 bg-gold-400" />
          <span className="text-xs font-semibold tracking-[0.18em] text-cream-50/75 uppercase">
            Penawaran khusus
          </span>
          <h2 className="font-display text-3xl leading-tight font-semibold md:text-4xl">
            Menginap Lebih Lama, Hemat Lebih Banyak
          </h2>
          <p className="max-w-md text-cream-50/80">
            Diskon 10 persen otomatis untuk menginap lebih dari 3 malam.
          </p>
          <Button asChild variant="secondary" className="mt-1 rounded-full">
            <Link to="/harga">Lihat Harga</Link>
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
