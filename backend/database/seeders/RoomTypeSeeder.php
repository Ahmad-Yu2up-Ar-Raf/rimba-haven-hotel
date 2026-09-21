<?php

namespace Database\Seeders;

use App\Models\RoomType;
use Illuminate\Database\Seeder;

class RoomTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            [
                'code' => 'STANDARD',
                'name' => 'Standard',
                'price_per_night' => 500000,
                'capacity' => 2,
                'size_m2' => 24,
                'description' => 'Kamar nyaman 24 m² untuk 2 tamu dengan pemandangan rimba.',
                'photo_url' => '/assets/images/rooms/standard-1.jpg',
                'video_url' => '/assets/videos/standard.mp4',
            ],
            [
                'code' => 'DELUXE',
                'name' => 'Deluxe',
                'price_per_night' => 800000,
                'capacity' => 2,
                'size_m2' => 36,
                'description' => 'Kamar deluxe 36 m² dengan jendela panorama hutan dan bathtub batu.',
                'photo_url' => '/assets/images/rooms/deluxe-1.jpg',
                'video_url' => '/assets/videos/deluxe.mp4',
            ],
            [
                'code' => 'FAMILY',
                'name' => 'Family (Executive)',
                'price_per_night' => 1200000,
                'capacity' => 4,
                'size_m2' => 48,
                'description' => 'Suite keluarga 48 m² untuk 4 tamu — label Executive pada brosur.',
                'photo_url' => '/assets/images/rooms/family-1.jpg',
                'video_url' => '/assets/videos/family.mp4',
            ],
        ];

        foreach ($types as $type) {
            RoomType::updateOrCreate(['code' => $type['code']], $type);
        }
    }
}
