<?php

namespace App\Services;

/**
 * Server-side booking price calculator (single source of truth).
 *
 * total = (price_per_night × nights) − discount + breakfast
 * discount   = 10% of base when nights > 3, else 0
 * breakfast  = flat BOOKING_BREAKFAST_FEE when checked, else 0
 */
class BookingPriceCalculator
{
    public function __construct(
        private readonly int $breakfastFee = 80000,
        private readonly int $discountThreshold = 3,
        private readonly float $discountRate = 0.10,
    ) {}

    /**
     * @return array{base:int,discount:int,breakfast:int,total:int}
     */
    public function calculate(int $pricePerNight, int $nights, bool $breakfast): array
    {
        $base = $pricePerNight * $nights;
        $discount = $nights > $this->discountThreshold
            ? (int) round($base * $this->discountRate)
            : 0;
        $breakfastFee = $breakfast ? $this->breakfastFee : 0;

        return [
            'base' => $base,
            'discount' => $discount,
            'breakfast' => $breakfastFee,
            'total' => $base - $discount + $breakfastFee,
        ];
    }
}
