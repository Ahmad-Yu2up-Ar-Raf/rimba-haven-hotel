import { Link, NavLink, useLocation } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Menu01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", label: "Beranda" },
  { to: "/kamar", label: "Kamar" },
  { to: "/harga", label: "Harga" },
  { to: "/tentang", label: "Tentang" },
  { to: "/pesan", label: "Pesan" },
];

/** Floating pill navbar. Glass is the single accent surface (R-10 dose cap). */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 md:pt-6">
      <nav
        aria-label="Navigasi utama"
        className="pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-4 rounded-full bg-background/85 py-2 pr-2 pl-5 shadow-[0_16px_40px_-20px_oklch(0.25_0.014_163.6/0.35)] ring-1 ring-foreground/10 backdrop-blur-xl"
      >
        <Link to="/" className="flex items-center gap-2.5" aria-label="Rimba Haven, beranda">
          <img src="/assets/logo/rh-mark.svg" alt="" className="size-8 text-primary" />
          <span className="font-display text-lg font-semibold tracking-wide">RIMBA HAVEN</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Button key={l.to} variant="ghost" size="sm" asChild className="rounded-full">
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  cn("rounded-full", isActive && "bg-secondary text-secondary-foreground")
                }
              >
                {l.label}
              </NavLink>
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden rounded-full bg-accent text-accent-foreground hover:bg-accent/90 md:inline-flex">
            <Link to="/pesan">
              Pesan Kamar
              <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4" data-icon="inline-end" />
            </Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Buka menu">
                <HugeiconsIcon icon={Menu01Icon} size={20} strokeWidth={1.5} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-2 pt-14">
              <SheetTitle className="sr-only">Menu navigasi</SheetTitle>
              {LINKS.map((l, i) => (
                <Button
                  key={l.to}
                  variant={location.pathname === l.to ? "secondary" : "ghost"}
                  asChild
                  className="justify-start rounded-xl text-base"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  <Link to={l.to} onClick={() => setOpen(false)}>
                    {l.label}
                  </Link>
                </Button>
              ))}
              <Button asChild className="mt-2 rounded-xl bg-accent text-accent-foreground">
                <Link to="/pesan" onClick={() => setOpen(false)}>
                  Pesan Kamar
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="absolute top-4 right-4 rounded-full" aria-label="Tutup menu" onClick={() => setOpen(false)}>
                <HugeiconsIcon icon={Cancel01Icon} size={20} strokeWidth={1.5} />
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

