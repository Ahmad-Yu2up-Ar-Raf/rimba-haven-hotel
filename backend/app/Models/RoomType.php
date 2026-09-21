<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomType extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'price_per_night',
        'capacity',
        'size_m2',
        'description',
        'photo_url',
        'video_url',
    ];

    protected function casts(): array
    {
        return [
            'price_per_night' => 'integer',
            'capacity' => 'integer',
            'size_m2' => 'integer',
        ];
    }
}
