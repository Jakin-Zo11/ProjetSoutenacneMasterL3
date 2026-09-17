<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentRegistry extends Model
{
    protected $fillable = [
        'matricule',
        'name',
        'mention',
        'parcours',
        'admission_year',
        'user_id',
    ];

    protected $casts = [
        'admission_year' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}