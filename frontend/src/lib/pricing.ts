import type { PriceBreakdown } from "@/types";
import { BREAKFAST_FEE, DISCOUNT_NIGHTS, DISCOUNT_RATE } from "./format";

/** Client preview mirror of BookingPriceCalculator (server remains the truth). */
export function previewTotal(
  pricePerNight: number,
  nights: number,
  breakfast: boolean,
): PriceBreakdown {
  const base = pricePerNight * nights;
  const discount = nights > DISCOUNT_NIGHTS ? Math.round(base * DISCOUNT_RATE) : 0;
  const breakfastFee = breakfast ? BREAKFAST_FEE : 0;
  return { base, discount, breakfast: breakfastFee, total: base - discount + breakfastFee };
}
