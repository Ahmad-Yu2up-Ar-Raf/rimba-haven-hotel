<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\HotelProfileResource;
use App\Models\HotelProfile;
use Illuminate\Http\JsonResponse;

class HotelProfileController extends Controller
{
    public function show(): JsonResponse
    {
        return response()->json([
            'data' => new HotelProfileResource(HotelProfile::firstOrFail()),
        ]);
    }
}
