<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('nama_pemesan', 100);
            $table->char('jenis_kelamin', 1);
            $table->char('nomor_identitas', 16);
            $table->string('room_type_code', 16);
            $table->integer('harga_satuan');
            $table->date('tanggal_pesan');
            $table->integer('durasi_menginap');
            $table->boolean('breakfast')->default(false);
            $table->integer('total_bayar');
            $table->timestamps();

            $table->index('nomor_identitas');
            $table->index('tanggal_pesan');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
