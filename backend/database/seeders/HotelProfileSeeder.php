<?php

namespace Database\Seeders;

use App\Models\HotelProfile;
use Illuminate\Database\Seeder;

class HotelProfileSeeder extends Seeder
{
    public function run(): void
    {
        HotelProfile::updateOrCreate(
            ['id' => 1],
            [
                'name' => 'Rimba Haven — Forest Elegant Hotel',
                'description' => "Rimba Haven adalah sanctuary di tengah hutan pinus Bogor tempat alam bertemu kemewahan yang tenang. Kamar-kamar kami membingkai rimba lewat jendela kaca setinggi langit-langit, dengan material kayu hangat, linen premium, dan aksen kuningan.\n\nSetiap menginap mendukung konservasi hutan di sekitar resor dan pemberdayaan masyarakat lokal.",
                'address' => 'Jl. Rimba Hijau No. 88, Bogor, Jawa Barat',
                'phone' => '+62-251-888-100',
                'email' => 'stay@rimbahaven.id',
            ],
        );
    }
}
