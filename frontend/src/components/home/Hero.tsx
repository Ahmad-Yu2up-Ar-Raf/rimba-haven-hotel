import { useRef } from "react";
import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { RoomCards } from "@/components/home/RoomCards";

gsap.registerPlugin(useGSAP);

const VALUES = ["Tenang", "Asli", "Restoratif"];

/** Hero with the single orchestrated entrance (R-19 purpose: first impression
 *  and orientation). bg scale, headline stagger, room cards rise. Once, on load. */
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
          .from(".hero-line", { y: 44, autoAlpha: 0, duration: 0.9, stagger: 0.12 }, 0.15)
          .from(".hero-fade", { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, 0.5)
          .from(
            ".room-card",
            { y: 64, autoAlpha: 0, duration: 0.9, stagger: 0.12, clearProps: "transform" },
            0.55,
          );
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
        <div className="absolute inset-0 bg-forest-950/55" aria-hidden="true" />
      </div>
      <div className="relative mx-auto flex min-h-[86svh] w-full max-w-7xl flex-col justify-end px-4 pt-32 pb-24 md:px-8">
        <h1 className="font-display max-w-2xl text-[clamp(2.75rem,6vw,5rem)] leading-[1.05] font-semibold tracking-tight text-cream-50">
          <span className="hero-line hero-anim block">Hutan.</span>
          <span className="hero-line hero-anim block">Tenang.</span>
          <span className="hero-line hero-anim block">Kamu.</span>
        </h1>
        <p className="hero-fade hero-anim mt-4 max-w-md text-cream-50/85">
          Sanctuary tempat alam bertemu kemewahan yang tenang.
        </p>
        <div className="hero-fade hero-anim mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/pesan">Pesan Kamar</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-cream-50/40 bg-transparent text-cream-50 hover:bg-cream-50/10 hover:text-cream-50"
          >
            <Link to="/kamar">Lihat Kamar</Link>
          </Button>
        </div>
        <ul className="hero-fade hero-anim mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream-50/75">
          {VALUES.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
        <div className="mt-10">
          <RoomCards variant="compact" />
        </div>
      </div>
    </section>
  );
}
