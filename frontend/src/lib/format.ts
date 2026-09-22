import { format } from "date-fns";
import { id } from "date-fns/locale";

export const BREAKFAST_FEE = 80000;
export const DISCOUNT_NIGHTS = 3;
export const DISCOUNT_RATE = 0.1;

export function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

/** ISO yyyy-mm-dd -> dd/mm/yyyy for display. Returns the input when unparseable. */
export function formatTanggalID(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return format(d, "dd/MM/yyyy", { locale: id });
}

/** Accepts native date value (yyyy-mm-dd) or typed dd/mm/yyyy. Null when invalid. */
export function toISODate(value: string): string | null {
  const v = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
    return Number.isNaN(new Date(`${v}T00:00:00`).getTime()) ? null : v;
  }
  const m = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const iso = `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  return Number.isNaN(new Date(`${iso}T00:00:00`).getTime()) ? null : iso;
}
