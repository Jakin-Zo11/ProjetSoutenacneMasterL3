<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Formation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'code',
        'name',
        'description',
    ];

    /**
     * Relation avec les promotions.
     *
     * @return HasMany
     */
    public function promotions(): HasMany
    {
        return $this->hasMany(Promotion::class);
    }
}
