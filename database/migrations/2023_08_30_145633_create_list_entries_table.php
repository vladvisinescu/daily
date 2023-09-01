<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('list_entries', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignId('list_item_id')->references('id')->on('list_items')->cascadeOnDelete();
            $table->json('meta')->default('{}');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('list_entries');
    }
};
