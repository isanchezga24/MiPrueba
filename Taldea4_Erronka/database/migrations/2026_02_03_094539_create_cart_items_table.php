<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            // Si un usuario se borra, se borra su carrito
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            // Si una obra se borra, desaparece del carrito
            $table->foreignId('obra_id')->constrained('obras')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};