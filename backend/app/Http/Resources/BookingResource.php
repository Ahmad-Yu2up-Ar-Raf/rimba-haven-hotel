<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_pemesan' => $this->nama_pemesan,
            'jenis_kelamin' => $this->jenis_kelamin,
            'nomor_identitas' => $this->nomor_identitas,
            'room_type_code' => $this->room_type_code,
            'harga_satuan' => (int) $this->harga_satuan,
            'tanggal_pesan' => $this->tanggal_pesan,
            'durasi_menginap' => (int) $this->durasi_menginap,
            'breakfast' => (bool) $this->breakfast,
            'total_bayar' => (int) $this->total_bayar,
            'breakdown' => $this->when(
                isset($this->breakdown),
                fn () => $this->breakdown,
            ),
        ];
    }
}
