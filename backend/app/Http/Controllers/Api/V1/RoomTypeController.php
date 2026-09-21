<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomTypeResource;
use App\Models\RoomType;
use Illuminate\Http\JsonResponse;

class RoomTypeController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => RoomTypeResource::collection(RoomType::orderBy('price_per_night')->get()),
        ]);
    }

    public function show(string $code): JsonResponse
    {
        $roomType = RoomType::where('code', strtoupper($code))->firstOrFail();

        return response()->json([
            'data' => new RoomTypeResource($roomType),
        ]);
    }
}
