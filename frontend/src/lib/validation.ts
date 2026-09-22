import { z } from "zod";
import { toISODate } from "./format";

export const NIK_ERROR = "isian salah..data harus 16 digit";
export const DURATION_ERROR = "harus isi angka";

export const nikSchema = z.string().regex(/^\d{16}$/, NIK_ERROR);

export const bookingSchema = z.object({
  namaPemesan: z.string().min(3, "Nama pemesan wajib diisi (min. 3 karakter)").max(100),
  jenisKelamin: z.enum(["L", "P"], "Pilih jenis kelamin"),
  nomorIdentitas: nikSchema,
  roomTypeCode: z.enum(["STANDARD", "DELUXE", "FAMILY"], "Pilih tipe kamar"),
  tanggalPesan: z
    .string()
    .refine((v) => toISODate(v) !== null, "Tanggal pesan tidak valid")
    .refine((v) => {
      const iso = toISODate(v);
      if (!iso) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(`${iso}T00:00:00`).getTime() >= today.getTime();
    }, "Tanggal pesan tidak valid"),
  durasiMenginap: z.string().refine((v) => {
    if (v.trim() === "") return false;
    const n = Number(v);
    return Number.isInteger(n) && n >= 1;
  }, DURATION_ERROR),
  breakfast: z.boolean(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
