import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoomCards } from "@/components/home/RoomCards";
import { Reveal } from "@/components/motion/Reveal";
import { ROOM_TYPES } from "@/data/content";

export function Rooms() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-32 pb-24 md:px-8 md:pb-32">
      <Reveal className="flex max-w-2xl flex-col gap-3 pb-10">
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">Kamar Kami</h1>
        <p className="leading-relaxed text-muted-foreground">
          Tiga tipe kamar, semuanya menghadap rimba. Pilih yang sesuai dengan
          rencanamu, lalu lanjutkan ke pemesanan.
        </p>
      </Reveal>
      <Tabs defaultValue="Semua" className="flex flex-col gap-8">
        <TabsList className="w-fit rounded-full">
          {["Semua", ...ROOM_TYPES.map((r) => r.name)].map((t) => (
            <TabsTrigger key={t} value={t} className="rounded-full">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="Semua" className="mt-0">
          <RoomCards variant="full" />
        </TabsContent>
        {ROOM_TYPES.map((r) => (
          <TabsContent key={r.code} value={r.name} className="mt-0">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <img
                src={r.photoUrl}
                alt={`Kamar ${r.name}`}
                className="h-80 w-full rounded-[1.75rem] object-cover"
              />
              <div className="flex flex-col justify-center gap-3">
                <h2 className="font-display text-3xl font-semibold">{r.name}</h2>
                <p className="leading-relaxed text-muted-foreground">{r.description}</p>
                <ul className="flex flex-col gap-1 text-sm">
                  {r.facilities.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
