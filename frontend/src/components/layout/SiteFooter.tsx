import { Link } from "react-router";
import { HOTEL_PROFILE } from "@/data/content";

/** Compact footer structured around real links only (R-05, R-24). */
export function SiteFooter() {
  return (
    <footer className="bg-forest-950 text-cream-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-16 md:flex-row md:justify-between md:px-8">
        <div className="flex max-w-sm flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <img src="/assets/logo/rh-mark.svg" alt="" className="size-8 text-cream-50/65" />
            <span className="font-display text-xl font-semibold tracking-wide">RIMBA HAVEN</span>
          </div>
          <p className="text-sm leading-relaxed text-cream-50/70">
            Sanctuary di tengah hutan pinus Bogor tempat alam bertemu kemewahan yang tenang.
          </p>
        </div>
        <nav aria-label="Navigasi bawah" className="flex flex-col gap-2 text-sm">
          <span className="text-xs font-semibold tracking-[0.2em] text-cream-50/65 uppercase">Jelajah</span>
          <Link to="/kamar" className="text-cream-50/80 hover:text-cream-50">Kamar</Link>
          <Link to="/harga" className="text-cream-50/80 hover:text-cream-50">Harga</Link>
          <Link to="/tentang" className="text-cream-50/80 hover:text-cream-50">Tentang</Link>
          <Link to="/pesan" className="text-cream-50/80 hover:text-cream-50">Pesan Kamar</Link>
        </nav>
        <div className="flex flex-col gap-2 text-sm">
          <span className="text-xs font-semibold tracking-[0.2em] text-cream-50/65 uppercase">Kontak</span>
          <span className="text-cream-50/80">{HOTEL_PROFILE.address}</span>
          <a href={`tel:${HOTEL_PROFILE.phone.replace(/[^+\d]/g, "")}`} className="text-cream-50/80 hover:text-cream-50">
            {HOTEL_PROFILE.phone}
          </a>
          <a href={`mailto:${HOTEL_PROFILE.email}`} className="text-cream-50/80 hover:text-cream-50">
            {HOTEL_PROFILE.email}
          </a>
        </div>
      </div>
      <div className="border-t border-cream-50/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-cream-50/60 md:px-8">
          Rimba Haven, demo sertifikasi Junior Web Developer (LSP Informatika).
        </p>
      </div>
    </footer>
  );
}
