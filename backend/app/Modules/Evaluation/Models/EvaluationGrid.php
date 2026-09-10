<?php

namespace App\Modules\Evaluation\Models;

use Illuminate\Database\Eloquent\Model;

class EvaluationGrid extends Model
{
    protected $fillable = ['name', 'description', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];

    public function criteria()
    {
        return $this->hasMany(EvaluationCriterion::class)->orderBy('position');
    }

    public function evaluations()
    {
        return $this->hasMany(DefenseEvaluation::class);
    }
}
