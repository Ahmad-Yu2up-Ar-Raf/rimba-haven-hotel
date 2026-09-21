<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'nama_pemesan' => ['required', 'string', 'min:3', 'max:100'],
            'jenis_kelamin' => ['required', 'in:L,P'],
            'nomor_identitas' => ['required', 'string', 'regex:/^\d{16}$/'],
            'room_type_code' => ['required', 'in:STANDARD,DELUXE,FAMILY'],
            'tanggal_pesan' => ['required', 'date', 'after_or_equal:today'],
            'durasi_menginap' => ['required', 'integer', 'min:1'],
            'breakfast' => ['sometimes', 'boolean'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nomor_identitas.regex' => 'isian salah..data harus 16 digit',
            'durasi_menginap.integer' => 'harus isi angka',
            'durasi_menginap.min' => 'harus isi angka',
        ];
    }
}
