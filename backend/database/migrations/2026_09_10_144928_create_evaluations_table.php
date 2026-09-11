<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('soutenance_id')->constrained()->onDelete('cascade');
            $table->foreignId('jury_user_id')->constrained('users')->onDelete('cascade');
            $table->decimal('note_presentation', 5, 2)->nullable();
            $table->decimal('note_manuscrit', 5, 2)->nullable();
            $table->decimal('note_reponses', 5, 2)->nullable();
            $table->decimal('note_finale', 5, 2)->nullable();
            $table->text('remarques')->nullable();
            $table->enum('status', ['brouillon', 'valide'])->default('brouillon');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('evaluations');
    }
};
