import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { BedDoubleIcon, Coffee01Icon, Leaf01Icon, Tree01Icon } from "@hugeicons/core-free-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Reveal } from "@/components/motion/Reveal";
import { FAQS, FEATURES, GALLERY } from "@/data/content";

const FEATURE_ICONS = [BedDoubleIcon, Coffee01Icon, Leaf01Icon, Tree01Icon];
const FEATURE_HREFS = ["/kamar", "/harga", "/tentang", "/tentang"] as const;

function RoundArrow({ dark = false }: { dark?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={
        dark
          ? "flex size-9 shrink-0 items-center justify-center rounded-full bg-cream-50/12 text-cream-50 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          : "flex size-9 shrink-0 items-center justify-center rounded-full bg-forest-900 text-cream-50 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      }
    >
      <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 12L12 4M6 4h6v6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Feature row: thin-line icons + nested arrow that routes to a real page. */
export function Features() {
  return (
    <Reveal className="mx-auto w-full max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <Link
            key={f.title}
            to={FEATURE_HREFS[i % FEATURE_HREFS.length]}
            className="group flex h-full flex-col gap-3 rounded-[1.25rem] border border-cream-200 bg-card p-6 transition-shadow duration-300 ease-out hover:shadow-[0_24px_60px_-28px_oklch(0.25_0.014_163.6/0.28)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <div className="flex items-start justify-between gap-3">
              <HugeiconsIcon
                icon={FEATURE_ICONS[i % FEATURE_ICONS.length]}
                size={26}
                strokeWidth={1.25}
                className="text-forest-700"
                aria-hidden="true"
              />
              <RoundArrow />
            </div>
            <h3 className="font-display text-xl font-semibold">{f.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{f.text}</p>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}

/** Discover: serif left, real mini booking form center, photo right. */
export function Relax() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (Number(guests) >= 4) params.set("tipe", "FAMILY");
    else if (Number(guests) >= 1) params.set("tipe", "STANDARD");
    navigate(`/pesan?${params.toString()}`);
  }

  return (
    <Reveal className="mx-auto w-full max-w-7xl px-4 pt-20 pb-20 md:px-8 md:pt-28 md:pb-28">
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
        <div className="flex flex-col items-start justify-center gap-4">
          <h2 className="font-display text-3xl leading-tight font-semibold md:text-4xl">
            Temukan Ketenangan Sejati
          </h2>
          <p className="max-w-[36ch] leading-relaxed text-muted-foreground">
            Dari kamar yang nyaman dan hidangan hangat hingga spa dan petualangan luar ruang,
            semua yang kamu butuhkan untuk beristirahat.
          </p>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/tentang">Cerita Kami</Link>
          </Button>
        </div>

        <div className="rounded-[1.75rem] bg-cream-100 p-1.5 ring-1 ring-foreground/5">
          <form
            onSubmit={onSubmit}
            className="flex h-full flex-col gap-4 rounded-[calc(1.75rem-0.375rem)] bg-card p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]"
          >
            <div className="flex flex-col gap-1">
              <span className="font-display text-xl font-semibold">Rencanakan Liburanmu</span>
              <p className="text-sm text-muted-foreground">
                Pilih tanggal dan jumlah tamu, lanjutkan ke form pemesanan.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="home-checkin">Check-in</Label>
                <Input
                  id="home-checkin"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="home-checkout">Check-out</Label>
                <Input
                  id="home-checkout"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || undefined}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="home-guests">Tamu</Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger id="home-guests" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 tamu</SelectItem>
                  <SelectItem value="2">2 tamu</SelectItem>
                  <SelectItem value="3">3 tamu</SelectItem>
                  <SelectItem value="4">4 tamu</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="mt-1 w-full gap-3 rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Cek Ketersediaan
              <RoundArrow dark />
            </Button>
          </form>
        </div>

        <img
          src="/assets/images/rooms/deluxe-1.jpg"
          alt="Kamar Deluxe dengan jendela menghadap hutan"
          loading="lazy"
          className="h-72 w-full rounded-[1.75rem] object-cover lg:h-full lg:min-h-[22rem]"
        />
      </div>
    </Reveal>
  );
}

const EXPERIENCES = [
  {
    title: "Jalur rimba pagi",
    text: "Berjalan santai di antara pinus sebelum sarapan.",
    href: "/tentang",
    img: "/assets/images/hero-forest.jpg",
    alt: "Jalur hutan pinus",
  },
  {
    title: "Sarapan hutan",
    text: "Hidangan lokal hangat setiap pagi.",
    href: "/harga",
    img: "/assets/images/dining-1.jpg",
    alt: "Sarapan platting",
  },
  {
    title: "Spa dan wellness",
    text: "Perawatan tenang di kabin kayu.",
    href: "/tentang",
    img: "/assets/images/offer-spa.jpg",
    alt: "Interior spa kabin",
  },
] as const;

/** FAQ: experiences + photo left, numbered accordion right (HAVEN split). */
export function Faq() {
  return (
    <Reveal className="mx-auto w-full max-w-7xl px-4 pb-20 md:px-8 md:pb-28">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-start gap-3">
            <h2 className="font-display text-3xl leading-tight font-semibold md:text-4xl">
              Pengalaman di Rimba Haven
            </h2>
            <p className="max-w-[36ch] text-muted-foreground">
              Kegiatan yang membuat menginap terasa lebih dari sekadar tidur.
            </p>
          </div>
          <ul className="flex flex-col gap-4">
            {EXPERIENCES.map((x) => (
              <li key={x.title}>
                <Link
                  to={x.href}
                  className="group flex items-center gap-4 rounded-[1.25rem] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <img
                    src={x.img}
                    alt={x.alt}
                    loading="lazy"
                    className="size-16 shrink-0 rounded-xl object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="font-medium">{x.title}</span>
                    <span className="text-sm text-muted-foreground">{x.text}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" className="w-fit rounded-full">
            <Link to="/tentang">Lihat Semua Pengalaman</Link>
          </Button>
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="font-display text-3xl leading-tight font-semibold md:text-4xl">
            Sering Ditanyakan
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="gap-4 text-left">
                  <span className="flex items-baseline gap-3">
                    <span className="font-display text-sm text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{f.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="flex items-center gap-4 rounded-[1.25rem] border border-cream-200 bg-card p-4">
            <img
              src="/assets/images/offer-spa.jpg"
              alt="Kabin hangat Rimba Haven"
              loading="lazy"
              className="size-14 shrink-0 rounded-lg object-cover"
            />
            <div className="flex min-w-0 flex-col gap-1">
              <p className="text-sm font-medium">Masih ada pertanyaan?</p>
              <a
                href="mailto:stay@rimbahaven.id"
                className="text-sm text-forest-700 underline underline-offset-4 hover:text-forest-900"
              >
                stay@rimbahaven.id
              </a>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

const TABS = ["Semua", "Kamar", "Alam", "Kuliner", "Spa"] as const;

export function Gallery() {
  const [openSrc, setOpenSrc] = useState<string | null>(null);
  const active = GALLERY.find((g) => g.src === openSrc);

  return (
    <Reveal className="mx-auto w-full max-w-7xl px-4 pb-24 md:px-8 md:pb-32">
      <div className="flex flex-col gap-6 rounded-[2rem] bg-cream-100 p-6 md:p-10">
        <div className="flex flex-col items-center gap-2">
          <img src="/assets/logo/rh-mark.svg" alt="" aria-hidden="true" className="size-8 opacity-70" />
          <h2 className="font-display text-3xl font-semibold">Galeri</h2>
        </div>
        <Tabs defaultValue="Semua" className="flex flex-col gap-6">
          <TabsList className="mx-auto rounded-full">
            {TABS.map((t) => (
              <TabsTrigger key={t} value={t} className="rounded-full">
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
          {TABS.map((t) => (
            <TabsContent key={t} value={t} className="mt-0">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {GALLERY.filter((g) => t === "Semua" || g.tab === t).map((g) => (
                  <Dialog key={g.src} open={openSrc === g.src} onOpenChange={(o) => setOpenSrc(o ? g.src : null)}>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="group w-full overflow-hidden rounded-2xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        aria-label={`Perbesar: ${g.alt}`}
                      >
                        <img
                          src={g.src}
                          alt={g.alt}
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl bg-forest-950 p-3 sm:max-w-3xl">
                      <DialogTitle className="sr-only">{g.alt}</DialogTitle>
                      {active && (
                        <img
                          src={active.src}
                          alt={active.alt}
                          className="max-h-[70vh] w-full rounded-xl object-contain"
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Reveal>
  );
}
