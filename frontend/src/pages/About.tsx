import { HOTEL_PROFILE } from "@/data/content";
import { Reveal } from "@/components/motion/Reveal";

export function About() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-32 pb-24 md:px-8 md:pb-32">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-4">
          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Tentang {HOTEL_PROFILE.name}
          </h1>
          {HOTEL_PROFILE.description.map((p) => (
            <p key={p.slice(0, 24)} className="leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </Reveal>
        <Reveal>
          <img
            src="/assets/images/hero-forest.jpg"
            alt="Kabana Rimba Haven di tepi hutan pinus"
            loading="lazy"
            className="h-80 w-full rounded-[1.75rem] object-cover lg:h-[28rem]"
          />
        </Reveal>
      </div>
      <Reveal className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="flex flex-col gap-1 rounded-[1.25rem] bg-card p-6 ring-1 ring-foreground/10">
          <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Alamat</span>
          <span className="font-medium">{HOTEL_PROFILE.address}</span>
        </div>
        <div className="flex flex-col gap-1 rounded-[1.25rem] bg-card p-6 ring-1 ring-foreground/10">
          <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Telepon</span>
          <a href={`tel:${HOTEL_PROFILE.phone.replace(/[^+\d]/g, "")}`} className="font-medium hover:underline">
            {HOTEL_PROFILE.phone}
          </a>
        </div>
        <div className="flex flex-col gap-1 rounded-[1.25rem] bg-card p-6 ring-1 ring-foreground/10">
          <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Email</span>
          <a href={`mailto:${HOTEL_PROFILE.email}`} className="font-medium hover:underline">
            {HOTEL_PROFILE.email}
          </a>
        </div>
      </Reveal>
    </main>
  );
}
