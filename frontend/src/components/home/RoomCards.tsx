import { Link } from "react-router";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROOM_TYPES } from "@/data/content";
import { formatIDR } from "@/lib/format";
import { cn } from "@/lib/utils";

function CardArrow() {
  return (
    <span
      aria-hidden="true"
      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-cream-50/15 text-cream-50 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-cream-50/25"
    >
      <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 12L12 4M6 4h6v6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function RoomCards({ variant = "compact" }: { variant?: "compact" | "full" }) {
  if (variant === "compact") {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
        {ROOM_TYPES.map((room, i) => (
          <Link
            key={room.code}
            to={`/pesan?tipe=${room.code}`}
            className="room-card lift-hover group relative block overflow-hidden rounded-[1.75rem] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            aria-label={`Pesan kamar ${room.name}`}
          >
            <AspectRatio ratio={3 / 4} className="overflow-hidden sm:aspect-[3 / 4]">
              <img
                src={room.photoUrl}
                alt={`Kamar ${room.name}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </AspectRatio>
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-forest-950/92 via-forest-950/30 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
              <div className="flex min-w-0 flex-col gap-1">
                <span className="font-display text-lg leading-snug text-cream-50">{room.name}</span>
                <span className="text-xs tracking-[0.12em] text-cream-50/65 uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <CardArrow />
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {ROOM_TYPES.map((room, i) => (
        <Card
          key={room.code}
          className="room-card lift-hover overflow-hidden rounded-[1.75rem] border-0 bg-forest-950 text-cream-50"
        >
          <CardContent className="p-0">
            <Link
              to={`/pesan?tipe=${room.code}`}
              className="group block rounded-[1.75rem] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              aria-label={`Pesan kamar ${room.name}`}
            >
              <AspectRatio ratio={16 / 10} className="overflow-hidden">
                <img
                  src={room.photoUrl}
                  alt={`Kamar ${room.name}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </AspectRatio>
              <div className="flex items-end justify-between gap-3 p-5">
                <div className="flex flex-col gap-1">
                  <span className="font-display text-lg leading-snug">{room.name}</span>
                  <span className="text-sm text-cream-50/70">
                    {formatIDR(room.pricePerNight)} / malam
                  </span>
                </div>
                <span className="font-display text-sm text-cream-50/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-col gap-3 px-5 pb-5">
                <ul className="flex flex-col gap-1 text-sm text-cream-50/70">
                  {room.facilities.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="flex items-center gap-2">
                  <Badge className="rounded-full bg-gold-400 text-forest-950 hover:bg-gold-400">
                    {room.capacity} tamu
                  </Badge>
                  <Button
                    size="sm"
                    className={cn("rounded-full bg-accent text-accent-foreground hover:bg-accent/90")}
                  >
                    Pesan
                  </Button>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
