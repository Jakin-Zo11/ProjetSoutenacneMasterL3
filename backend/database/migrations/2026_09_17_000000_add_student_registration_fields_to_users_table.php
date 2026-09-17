<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('matricule')->nullable()->unique()->after('role');
            $table->string('mention')->nullable()->after('matricule');
            $table->string('parcours')->nullable()->after('mention');
            $table->unsignedSmallInteger('admission_year')->nullable()->after('parcours');
            $table->string('student_status')->default('approved')->after('admission_year');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'matricule',
                'mention',
                'parcours',
                'admission_year',
                'student_status',
            ]);
        });
    }
};
