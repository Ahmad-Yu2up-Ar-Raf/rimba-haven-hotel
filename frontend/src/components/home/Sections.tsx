import { Link } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { BedDoubleIcon, Coffee01Icon, Leaf01Icon, Tree01Icon } from "@hugeicons/core-free-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal } from "@/components/motion/Reveal";
import { FAQS, FEATURES, GALLERY } from "@/data/content";

const FEATURE_ICONS = [BedDoubleIcon, Coffee01Icon, Leaf01Icon, Tree01Icon];

/** Four hotel pillars. Rows, not identical heavy cards (R-14): the icon and
 *  one-line text carry the weight, hierarchy stays flat on purpose. */
export function Features() {
  return (
    <Reveal className="mx-auto w-full max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <div key={f.title} className="flex flex-col gap-2">
            <HugeiconsIcon
              icon={FEATURE_ICONS[i % FEATURE_ICONS.length]}
              size={26}
              strokeWidth={1.25}
              className="text-forest-700"
              aria-hidden="true"
            />
            <h3 className="font-display text-xl font-semibold">{f.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/** Editorial split: story left, booking shortcut card center, photo right. */
export function Relax() {
  return (
    <Reveal className="mx-auto w-full max-w-7xl px-4 pb-20 md:px-8 md:pb-28">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
        <div className="flex flex-col items-start gap-4">
          <h2 className="font-display text-3xl leading-tight font-semibold md:text-4xl">
            Temukan Ketenangan Sejati
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Dari kamar yang nyaman dan hidangan hangat hingga spa dan petualangan
            luar ruang, semua yang kamu butuhkan untuk beristirahat.
          </p>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/tentang">Cerita Kami</Link>
          </Button>
        </div>
        <div className="flex flex-col gap-3 rounded-[1.75rem] bg-card p-6 shadow-[0_24px_60px_-24px_oklch(0.25_0.014_163.6/0.25)] ring-1 ring-foreground/5">
          <span className="font-display text-xl font-semibold">Rencanakan Liburanmu</span>
          <p className="text-sm text-muted-foreground">
            Pilih kamar, tentukan tanggal dan durasi, total dihitung otomatis.
          </p>
          <Button asChild className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/pesan">Mulai Memesan</Link>
          </Button>
        </div>
        <img
          src="/assets/images/rooms/deluxe-1.jpg"
          alt="Kamar Deluxe dengan jendela menghadap hutan"
          loading="lazy"
          className="h-72 w-full rounded-[1.75rem] object-cover lg:h-96"
        />
      </div>
    </Reveal>
  );
}

/** Product-real questions only (R-28): policies a guest actually asks about. */
export function Faq() {
  return (
    <Reveal className="mx-auto w-full max-w-7xl px-4 pb-20 md:px-8 md:pb-28">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col items-start gap-3">
          <h2 className="font-display text-3xl leading-tight font-semibold md:text-4xl">
            Sering Ditanyakan
          </h2>
          <p className="text-muted-foreground">
            Kebijakan menginap yang perlu kamu tahu sebelum memesan.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Reveal>
  );
}

const TABS = ["Semua", "Kamar", "Alam", "Kuliner"] as const;

/** Photo gallery filtered by real tabs. Images are local, attributed assets. */
export function Gallery() {
  return (
    <Reveal className="mx-auto w-full max-w-7xl px-4 pb-24 md:px-8 md:pb-32">
      <div className="flex flex-col gap-6 rounded-[2rem] bg-cream-100 p-6 md:p-10">
        <h2 className="font-display text-center text-3xl font-semibold">Galeri</h2>
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
                  <img
                    key={g.src}
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-2xl object-cover"
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Reveal>
  );
}
