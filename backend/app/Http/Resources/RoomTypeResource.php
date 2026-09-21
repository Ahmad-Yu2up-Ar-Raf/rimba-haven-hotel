<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomTypeResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'code' => $this->code,
            'name' => $this->name,
            'price_per_night' => (int) $this->price_per_night,
            'capacity' => (int) $this->capacity,
            'size_m2' => $this->size_m2 !== null ? (int) $this->size_m2 : null,
            'description' => $this->description,
            'photo_url' => $this->photo_url,
            'video_url' => $this->video_url,
        ];
    }
}
