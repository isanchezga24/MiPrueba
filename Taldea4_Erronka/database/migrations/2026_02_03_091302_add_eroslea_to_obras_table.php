<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up(): void
{
    Schema::table('obras', function (Blueprint $table) {
        // Guardaremos quién lo ha comprado directamente
        $table->foreignId('eroslea_id')->nullable()->constrained('users')->onDelete('set null');
    });
}

public function down(): void
{
    Schema::table('obras', function (Blueprint $table) {
        $table->dropForeign(['eroslea_id']);
        $table->dropColumn('eroslea_id');
    });
}
};
