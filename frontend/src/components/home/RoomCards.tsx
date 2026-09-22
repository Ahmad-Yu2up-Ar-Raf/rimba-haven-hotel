import { Link } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROOM_TYPES } from "@/data/content";
import { formatIDR } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Room cards. Hero overlap uses the compact face (photo + name + number);
 *  the catalog variant adds price, facilities, and the booking CTA. */
export function RoomCards({ variant = "compact" }: { variant?: "compact" | "full" }) {
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
                  {variant === "full" ? (
                    <span className="text-sm text-cream-50/70">
                      {formatIDR(room.pricePerNight)} / malam
                    </span>
                  ) : (
                    <span className="text-sm text-cream-50/70">{room.capacity} tamu</span>
                  )}
                </div>
                <span className="font-display text-sm text-cream-50/50">
                  0{i + 1}
                </span>
              </div>
              {variant === "full" && (
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
                      <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" data-icon="inline-end" />
                    </Button>
                  </div>
                </div>
              )}
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
