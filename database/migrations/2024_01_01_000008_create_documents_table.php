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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dispute_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('filename');
            $table->string('original_filename');
            $table->string('mime_type');
            $table->unsignedInteger('file_size');
            $table->enum('type', ['petition', 'evidence', 'response', 'summons', 'minutes', 'decision', 'other'])->default('other');
            $table->text('description')->nullable();
            $table->foreignId('uploaded_by')->constrained('users');
            $table->boolean('is_public')->default(false);
            $table->timestamps();
            
            $table->index('dispute_id');
            $table->index('type');
            $table->index('uploaded_by');
            $table->index(['dispute_id', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};