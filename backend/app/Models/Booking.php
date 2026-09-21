<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_pemesan',
        'jenis_kelamin',
        'nomor_identitas',
        'room_type_code',
        'harga_satuan',
        'tanggal_pesan',
        'durasi_menginap',
        'breakfast',
        'total_bayar',
    ];

    protected function casts(): array
    {
        return [
            'tanggal_pesan' => 'date:Y-m-d',
            'durasi_menginap' => 'integer',
            'harga_satuan' => 'integer',
            'total_bayar' => 'integer',
            'breakfast' => 'boolean',
        ];
    }
}
