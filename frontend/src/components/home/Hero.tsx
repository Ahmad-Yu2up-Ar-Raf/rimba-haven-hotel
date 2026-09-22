import { useRef } from "react";
import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { HugeiconsIcon } from "@hugeicons/react";
import { Leaf01Icon, MountainIcon, Sun01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(useGSAP);

const VALUES = [
  { label: "Tenang", icon: Leaf01Icon },
  { label: "Asli", icon: MountainIcon },
  { label: "Restoratif", icon: Sun01Icon },
] as const;

function ArrowNest() {
  return (
    <span
      aria-hidden="true"
      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-forest-950/15 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 12L12 4M6 4h6v6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero-anim", { clearProps: "all" });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(".hero-bg", { scale: 1.08, duration: 1.4 }, 0)
          .from(".hero-line", { y: 48, autoAlpha: 0, duration: 0.95, stagger: 0.12 }, 0.12)
          .from(".hero-fade", { y: 28, autoAlpha: 0, duration: 0.75, stagger: 0.1 }, 0.45);
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} aria-label="Sambutan Rimba Haven" className="relative">
      <div className="absolute inset-0 overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem]">
        <img
          src="/assets/images/hero-forest.jpg"
          alt="Kabana Rimba Haven di tepi hutan pinus"
          className="hero-bg hero-anim h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-forest-950/85 via-forest-950/45 to-forest-950/30" aria-hidden="true" />
      </div>
      <div className="relative mx-auto flex min-h-[86svh] w-full max-w-7xl flex-col justify-end px-4 pt-32 pb-28 md:px-8 md:pb-40">
        <h1 className="font-display max-w-2xl text-[clamp(2.75rem,6vw,5rem)] leading-[1.05] font-semibold tracking-tight text-cream-50">
          <span className="hero-line hero-anim block">Hutan.</span>
          <span className="hero-line hero-anim block">Tenang.</span>
          <span className="hero-line hero-anim block">Kamu.</span>
        </h1>
        <p className="hero-fade hero-anim mt-4 max-w-md text-base text-cream-50/85 md:text-lg">
          Sanctuary tempat alam bertemu kemewahan yang tenang.
        </p>
        <div className="hero-fade hero-anim mt-7 flex flex-wrap gap-3">
          <Button
            asChild
            size="lg"
            className="group gap-3 rounded-full bg-moss-600 px-6 text-white hover:bg-moss-500"
          >
            <Link to="/pesan">
              Pesan Kamar
              <ArrowNest />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="group gap-3 rounded-full border-cream-50/40 bg-transparent px-6 text-cream-50 hover:bg-cream-50/10 hover:text-cream-50"
          >
            <Link to="/kamar">
              Lihat Kamar
              <ArrowNest />
            </Link>
          </Button>
        </div>
        <ul className="hero-fade hero-anim mt-12 flex flex-wrap items-center gap-x-0 gap-y-3 text-sm text-cream-50/85">
          {VALUES.map(({ label, icon }, i) => (
            <li key={label} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="mx-3 h-3 w-px bg-cream-50/35 md:mx-4" />
              )}
              <HugeiconsIcon icon={icon} size={16} strokeWidth={1.5} className="text-gold-400" aria-hidden="true" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
