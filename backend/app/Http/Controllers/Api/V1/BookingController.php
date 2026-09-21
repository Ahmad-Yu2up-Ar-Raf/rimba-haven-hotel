<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Models\RoomType;
use App\Services\BookingPriceCalculator;
use Illuminate\Http\JsonResponse;

class BookingController extends Controller
{
    public function index(): JsonResponse
    {
        $bookings = Booking::orderByDesc('created_at')->paginate(20);

        return response()->json([
            'data' => BookingResource::collection($bookings),
            'meta' => [
                'current_page' => $bookings->currentPage(),
                'last_page' => $bookings->lastPage(),
                'per_page' => $bookings->perPage(),
                'total' => $bookings->total(),
            ],
        ]);
    }

    public function store(StoreBookingRequest $request, BookingPriceCalculator $calculator): JsonResponse
    {
        $data = $request->validated();

        $roomType = RoomType::where('code', $data['room_type_code'])->firstOrFail();
        $breakdown = $calculator->calculate(
            (int) $roomType->price_per_night,
            (int) $data['durasi_menginap'],
            (bool) ($data['breakfast'] ?? false),
        );

        $booking = Booking::create([
            ...$data,
            'harga_satuan' => $roomType->price_per_night,
            'total_bayar' => $breakdown['total'],
        ]);
        $booking->breakdown = $breakdown;

        return response()->json(['data' => new BookingResource($booking)], 201);
    }

    public function show(int $id): JsonResponse
    {
        return response()->json([
            'data' => new BookingResource(Booking::findOrFail($id)),
        ]);
    }
}
