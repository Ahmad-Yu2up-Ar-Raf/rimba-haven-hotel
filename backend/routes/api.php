<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — Rimba Haven (ground truth, see docs/architecture.md §2.5)
|--------------------------------------------------------------------------
| Controllers land in Phase 3. Route names/shapes below are the contract
| the React SPA (Ky client) codes against.
*/

Route::prefix('v1')->group(function () {
    Route::get('room-types', 'RoomTypeController@index');
    Route::get('room-types/{code}', 'RoomTypeController@show');
    Route::get('hotel-profile', 'HotelProfileController@show');
    Route::get('bookings', 'BookingController@index');
    Route::post('bookings', 'BookingController@store');
    Route::get('bookings/{id}', 'BookingController@show');
});
