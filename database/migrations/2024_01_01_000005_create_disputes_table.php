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
        Schema::create('disputes', function (Blueprint $table) {
            $table->id();
            $table->string('case_number')->unique();
            $table->string('title');
            $table->text('description');
            $table->foreignId('petitioner_id')->constrained('users')->onDelete('cascade');
            $table->string('respondent_agency');
            $table->enum('status', ['submitted', 'verified', 'scheduled', 'in_progress', 'decided', 'closed'])->default('submitted');
            $table->enum('category', ['information_access', 'information_dispute', 'objection', 'other'])->default('information_dispute');
            $table->date('incident_date')->nullable();
            $table->text('petitioner_demands')->nullable();
            $table->json('documents')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users');
            $table->timestamps();
            
            $table->index('case_number');
            $table->index('status');
            $table->index('petitioner_id');
            $table->index('category');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('disputes');
    }
};