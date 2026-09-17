<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_registry', function (Blueprint $table) {
            $table->id();
            $table->string('matricule')->unique();
            $table->string('name');
            $table->string('mention');
            $table->string('parcours');
            $table->unsignedSmallInteger('admission_year');
            $table->foreignId('user_id')->nullable()->unique()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_registry');
    }
};