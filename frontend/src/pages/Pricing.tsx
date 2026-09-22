import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OfferBanner } from "@/components/home/OfferBanner";
import { Reveal } from "@/components/motion/Reveal";
import { ROOM_TYPES } from "@/data/content";
import { formatIDR } from "@/lib/format";

export function Pricing() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-32 pb-24 md:px-8 md:pb-32">
      <Reveal className="flex max-w-2xl flex-col gap-3 pb-10">
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">Daftar Harga</h1>
        <p className="leading-relaxed text-muted-foreground">
          Harga per malam yang transparan. Diskon 10 persen berlaku otomatis
          untuk menginap lebih dari 3 malam, sarapan Rp80.000 per pesanan.
        </p>
      </Reveal>
      <Reveal>
        <div className="overflow-x-auto rounded-[1.75rem] ring-1 ring-foreground/10">
          <Table>
            <TableHeader className="bg-cream-100">
              <TableRow>
                <TableHead>Tipe</TableHead>
                <TableHead>Harga / Malam</TableHead>
                <TableHead>Kapasitas</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROOM_TYPES.map((r) => (
                <TableRow key={r.code}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell className="tabular-nums">{formatIDR(r.pricePerNight)}</TableCell>
                  <TableCell>{r.capacity} tamu</TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link to={`/pesan?tipe=${r.code}`}>Pesan</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Reveal>
      <div className="pt-16">
        <OfferBanner />
      </div>
    </main>
  );
}
