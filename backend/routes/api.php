<?php

use App\Http\Controllers\Api\V1\BookingController;
use App\Http\Controllers\Api\V1\HotelProfileController;
use App\Http\Controllers\Api\V1\RoomTypeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — Rimba Haven (ground truth, see docs/architecture.md §2.5)
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    Route::get('room-types', [RoomTypeController::class, 'index']);
    Route::get('room-types/{code}', [RoomTypeController::class, 'show']);
    Route::get('hotel-profile', [HotelProfileController::class, 'show']);
    Route::get('bookings', [BookingController::class, 'index']);
    Route::post('bookings', [BookingController::class, 'store']);
    Route::get('bookings/{id}', [BookingController::class, 'show']);
});
