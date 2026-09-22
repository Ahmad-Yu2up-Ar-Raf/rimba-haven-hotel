import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Scroll-triggered entrance. Purpose (R-19): guide attention as sections enter.
 *  transform/opacity only, fires once, disabled under reduced motion. */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { clearProps: "transform,opacity,visibility" });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el, {
          y: 48,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
