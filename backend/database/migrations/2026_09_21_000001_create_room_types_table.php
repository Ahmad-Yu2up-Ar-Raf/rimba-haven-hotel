<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('room_types', function (Blueprint $table) {
            $table->id();
            $table->string('code', 16)->unique();
            $table->string('name', 64);
            $table->integer('price_per_night');
            $table->integer('capacity')->default(2);
            $table->integer('size_m2')->nullable();
            $table->text('description')->nullable();
            $table->string('photo_url')->nullable();
            $table->string('video_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('room_types');
    }
};
