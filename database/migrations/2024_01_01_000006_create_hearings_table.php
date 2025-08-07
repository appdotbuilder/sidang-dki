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
        Schema::create('hearings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dispute_id')->constrained()->onDelete('cascade');
            $table->datetime('scheduled_at');
            $table->string('location')->default('Ruang Sidang Komisi Informasi DKI Jakarta');
            $table->enum('type', ['preliminary', 'main', 'mediation', 'verdict'])->default('main');
            $table->enum('status', ['scheduled', 'ongoing', 'completed', 'postponed', 'cancelled'])->default('scheduled');
            $table->text('agenda')->nullable();
            $table->text('notes')->nullable();
            $table->json('attendees')->nullable();
            $table->foreignId('scheduled_by')->nullable()->constrained('users');
            $table->foreignId('commissioner_id')->nullable()->constrained('users');
            $table->timestamps();
            
            $table->index('dispute_id');
            $table->index('scheduled_at');
            $table->index('status');
            $table->index('type');
            $table->index(['status', 'scheduled_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hearings');
    }
};