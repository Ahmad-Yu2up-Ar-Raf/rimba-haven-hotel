import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

/** Forest offer panel. Purpose: surface the real >3-night 10 percent policy
 *  where the booking decision happens, not decoration. */
export function OfferBanner() {
  return (
    <Reveal className="mx-auto w-full max-w-7xl px-4 md:px-8">
      <div className="flex flex-col gap-6 rounded-[2rem] bg-forest-900 p-6 text-cream-50 md:flex-row md:items-center md:p-10">
        <img
          src="/assets/images/offer-spa.jpg"
          alt="Interior kabin yang hangat"
          loading="lazy"
          className="h-56 w-full rounded-[1.25rem] object-cover md:h-64 md:w-2/5"
        />
        <div className="flex flex-col items-start gap-3 md:pl-4">
          <span className="text-xs font-semibold tracking-[0.2em] text-gold-400 uppercase">
            Penawaran khusus
          </span>
          <h2 className="font-display text-3xl leading-tight font-semibold md:text-4xl">
            Menginap Lebih Lama, Hemat Lebih Banyak
          </h2>
          <p className="max-w-md text-cream-50/75">
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
