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
        Schema::create('decisions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dispute_id')->constrained()->onDelete('cascade');
            $table->string('decision_number')->unique();
            $table->enum('type', ['granted', 'partially_granted', 'rejected', 'dismissed']);
            $table->text('ruling');
            $table->text('considerations');
            $table->text('orders')->nullable();
            $table->date('effective_date')->nullable();
            $table->foreignId('commissioner_id')->constrained('users');
            $table->enum('status', ['draft', 'final', 'appealed'])->default('draft');
            $table->timestamp('finalized_at')->nullable();
            $table->json('panel_members')->nullable();
            $table->timestamps();
            
            $table->index('dispute_id');
            $table->index('decision_number');
            $table->index('type');
            $table->index('status');
            $table->index('commissioner_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('decisions');
    }
};