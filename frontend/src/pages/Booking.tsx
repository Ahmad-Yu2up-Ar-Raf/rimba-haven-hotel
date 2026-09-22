import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { HTTPError } from "ky";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Reveal } from "@/components/motion/Reveal";
import { api } from "@/api/client";
import { ROOM_TYPES } from "@/data/content";
import { formatIDR, formatTanggalID, toISODate } from "@/lib/format";
import { previewTotal } from "@/lib/pricing";
import {
  DURATION_ERROR,
  NIK_ERROR,
  bookingSchema,
  type BookingFormValues,
} from "@/lib/validation";
import type { PriceBreakdown, RoomTypeCode } from "@/types";
import { cn } from "@/lib/utils";

const VALID_CODES: RoomTypeCode[] = ["STANDARD", "DELUXE", "FAMILY"];

function initialTipe(search: URLSearchParams): RoomTypeCode {
  const t = search.get("tipe")?.toUpperCase();
  return VALID_CODES.includes(t as RoomTypeCode) ? (t as RoomTypeCode) : "STANDARD";
}

function fieldError(errors: unknown): string | null {
  if (Array.isArray(errors) && errors.length > 0) return String(errors[0]);
  return null;
}

export function Booking() {
  const [search] = useSearchParams();
  const [calc, setCalc] = useState<{ snapshot: string; result: PriceBreakdown } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const form = useForm({
    defaultValues: {
      namaPemesan: "",
      jenisKelamin: "" as "" | "L" | "P",
      nomorIdentitas: "",
      roomTypeCode: initialTipe(search),
      tanggalPesan: "",
      durasiMenginap: "",
      breakfast: false,
    } as BookingFormValues & { jenisKelamin: "" | "L" | "P" },
    validators: {
      onChange: ({ value }) => {
        if (value.jenisKelamin !== "L" && value.jenisKelamin !== "P")
          return { fields: { jenisKelamin: "Pilih jenis kelamin" } };
        return undefined;
      },
    },
  });

  const values = form.state.values;
  const room = ROOM_TYPES.find((r) => r.code === values.roomTypeCode) ?? ROOM_TYPES[0];
  const snapshot = useMemo(() => JSON.stringify(values), [values]);
  const calcStale = calc !== null && calc.snapshot !== snapshot;

  function handleHitung() {
    setSubmitError(null);
    const parsed = bookingSchema.safeParse(values);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      toast.error("Form belum valid", { description: first.message });
      return;
    }
    const nights = Number(parsed.data.durasiMenginap);
    setCalc({ snapshot, result: previewTotal(room.pricePerNight, nights, parsed.data.breakfast) });
    toast.success("Total bayar dihitung", { description: formatIDR(previewTotal(room.pricePerNight, nights, parsed.data.breakfast).total) });
  }

  async function handleSimpan() {
    if (!calc || calcStale) return;
    setSending(true);
    setSubmitError(null);
    const iso = toISODate(values.tanggalPesan) ?? values.tanggalPesan;
    try {
      await api.post("bookings", {
        json: {
          nama_pemesan: values.namaPemesan,
          jenis_kelamin: values.jenisKelamin,
          nomor_identitas: values.nomorIdentitas,
          room_type_code: values.roomTypeCode,
          tanggal_pesan: iso,
          durasi_menginap: Number(values.durasiMenginap),
          breakfast: values.breakfast,
        },
      });
      toast.success("Pesanan tersimpan");
      const tipe = values.roomTypeCode;
      form.reset();
      form.setFieldValue("roomTypeCode", tipe);
      setCalc(null);
    } catch (e) {
      const message =
        e instanceof HTTPError && e.response.status === 422
          ? "Server menolak isian. Periksa kembali field yang ditandai."
          : "Server belum tersambung. Jalankan backend di :8000 lalu coba lagi.";
      setSubmitError(message);
      toast.error("Gagal menyimpan pesanan", { description: message });
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-32 pb-24 md:px-8 md:pb-32">
      <Reveal className="flex max-w-2xl flex-col gap-3 pb-10">
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">Pesan Kamar</h1>
        <p className="leading-relaxed text-muted-foreground">
          Isi form di bawah, tekan Hitung Total Bayar, lalu simpan pesananmu.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <form
            className="flex flex-col gap-5 rounded-[1.75rem] bg-card p-6 ring-1 ring-foreground/10 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              void handleSimpan();
            }}
          >
            <form.Field
              name="namaPemesan"
              validators={{
                onChange: ({ value }) =>
                  value.trim().length < 3 ? "Nama pemesan wajib diisi (min. 3 karakter)" : undefined,
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="nama">Nama Pemesan</Label>
                  <Input
                    id="nama"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={field.state.meta.errors.length > 0}
                    placeholder="Nama lengkap"
                  />
                  {fieldError(field.state.meta.errors) && (
                    <p role="alert" className="text-sm text-destructive">{fieldError(field.state.meta.errors)}</p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="jenisKelamin"
              validators={{
                onChange: ({ value }) =>
                  value !== "L" && value !== "P" ? "Pilih jenis kelamin" : undefined,
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label>Jenis Kelamin</Label>
                  <RadioGroup
                    value={field.state.value}
                    onValueChange={(v) => field.handleChange(v as "L" | "P")}
                    className="flex gap-6"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="L" id="jk-l" />
                      <Label htmlFor="jk-l">Laki-laki</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="P" id="jk-p" />
                      <Label htmlFor="jk-p">Perempuan</Label>
                    </div>
                  </RadioGroup>
                  {fieldError(field.state.meta.errors) && (
                    <p role="alert" className="text-sm text-destructive">{fieldError(field.state.meta.errors)}</p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="nomorIdentitas"
              validators={{
                onChange: ({ value }) =>
                  /^\d{16}$/.test(value.trim()) ? undefined : NIK_ERROR,
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="nik">Nomor Identitas</Label>
                  <Input
                    id="nik"
                    inputMode="numeric"
                    maxLength={16}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value.replace(/\D/g, ""))}
                    onBlur={field.handleBlur}
                    aria-invalid={field.state.meta.errors.length > 0}
                    placeholder="16 digit angka"
                  />
                  {fieldError(field.state.meta.errors) && (
                    <p role="alert" className="text-sm text-destructive">{fieldError(field.state.meta.errors)}</p>
                  )}
                </div>
              )}
            </form.Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <form.Field name="roomTypeCode">
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="tipe">Tipe Kamar</Label>
                    <Select
                      value={field.state.value}
                      onValueChange={(v) => field.handleChange(v as RoomTypeCode)}
                    >
                      <SelectTrigger id="tipe" className="w-full rounded-xl">
                        <SelectValue placeholder="Pilih tipe kamar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {ROOM_TYPES.map((r) => (
                            <SelectItem key={r.code} value={r.code}>
                              {r.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </form.Field>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="harga">Harga</Label>
                <Input id="harga" value={formatIDR(room.pricePerNight)} readOnly className="tabular-nums" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <form.Field
                name="tanggalPesan"
                validators={{
                  onChange: ({ value }) =>
                    toISODate(value) === null ? "Tanggal pesan tidak valid" : undefined,
                }}
              >
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="tanggal">Tanggal Pesan</Label>
                    <Input
                      id="tanggal"
                      type="date"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={field.state.meta.errors.length > 0}
                    />
                    {fieldError(field.state.meta.errors) && (
                      <p role="alert" className="text-sm text-destructive">{fieldError(field.state.meta.errors)}</p>
                    )}
                  </div>
                )}
              </form.Field>
              <form.Field
                name="durasiMenginap"
                validators={{
                  onChange: ({ value }) => {
                    if (value.trim() === "") return DURATION_ERROR;
                    const n = Number(value);
                    return Number.isInteger(n) && n >= 1 ? undefined : DURATION_ERROR;
                  },
                }}
              >
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="durasi">Durasi Menginap (malam)</Label>
                    <Input
                      id="durasi"
                      inputMode="numeric"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={field.state.meta.errors.length > 0}
                      placeholder="Contoh: 2"
                    />
                    {fieldError(field.state.meta.errors) && (
                      <p role="alert" className="text-sm text-destructive">{fieldError(field.state.meta.errors)}</p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            <form.Field name="breakfast">
              {(field) => (
                <div className="flex items-center gap-2.5">
                  <Checkbox
                    id="breakfast"
                    checked={field.state.value}
                    onCheckedChange={(v) => field.handleChange(v === true)}
                  />
                  <Label htmlFor="breakfast">Termasuk Breakfast (+Rp80.000)</Label>
                </div>
              )}
            </form.Field>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="total">Total Bayar</Label>
              <Input
                id="total"
                value={calc && !calcStale ? formatIDR(calc.result.total) : ""}
                readOnly
                placeholder="Tekan Hitung Total Bayar"
                className="text-lg font-bold tabular-nums"
              />
              {calcStale && (
                <p className="text-sm text-muted-foreground">Isian berubah. Hitung ulang sebelum menyimpan.</p>
              )}
            </div>

            {submitError && (
              <p role="alert" className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
                {submitError}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                onClick={handleHitung}
                className="flex-1 rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Hitung Total Bayar
              </Button>
              <Button
                type="submit"
                disabled={!calc || calcStale || sending}
                className={cn("flex-1 rounded-full")}
              >
                {sending ? "Menyimpan..." : "Simpan Pesanan"}
              </Button>
            </div>
          </form>
        </Reveal>

        <Reveal className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 rounded-[1.75rem] bg-forest-900 p-6 text-cream-50 md:p-7">
            <span className="text-xs font-semibold tracking-[0.2em] text-forest-700 uppercase">Ringkasan</span>
            <div className="flex justify-between text-sm">
              <span className="text-cream-50/70">Kamar</span>
              <span>{room.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-cream-50/70">Harga / malam</span>
              <span className="tabular-nums">{formatIDR(room.pricePerNight)}</span>
            </div>
            {calc && !calcStale && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-cream-50/70">Dasar</span>
                  <span className="tabular-nums">{formatIDR(calc.result.base)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cream-50/70">Diskon</span>
                  <span className="tabular-nums">-{formatIDR(calc.result.discount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cream-50/70">Breakfast</span>
                  <span className="tabular-nums">+{formatIDR(calc.result.breakfast)}</span>
                </div>
                <div className="flex justify-between border-t border-cream-50/15 pt-2 text-base font-bold">
                  <span>Total</span>
                  <span className="tabular-nums">{formatIDR(calc.result.total)}</span>
                </div>
              </>
            )}
          </div>
          <img
            src={room.photoUrl}
            alt={`Kamar ${room.name}`}
            loading="lazy"
            className="h-52 w-full rounded-[1.75rem] object-cover"
          />
        </Reveal>
      </div>

      <Reveal className="pt-16">
        <h2 className="font-display pb-5 text-2xl font-semibold md:text-3xl">Riwayat Pesanan</h2>
        <div className="overflow-x-auto rounded-[1.75rem] ring-1 ring-foreground/10">
          <Table>
            <TableHeader className="bg-cream-100">
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Durasi</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                  Belum ada pesanan tersambung. Riwayat tampil di sini setelah server backend di :8000 aktif.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="pt-3 text-xs text-muted-foreground">
          Contoh tampilan tanggal: {formatTanggalID("2026-10-01")} (format dd/mm/yyyy).
        </p>
      </Reveal>
    </main>
  );
}
