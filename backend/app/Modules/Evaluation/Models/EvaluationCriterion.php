<?php

namespace App\Modules\Evaluation\Models;

use Illuminate\Database\Eloquent\Model;

class EvaluationCriterion extends Model
{
    protected $fillable = ['evaluation_grid_id', 'name', 'description', 'max_score', 'coefficient', 'position'];
    protected $casts = ['max_score' => 'decimal:2', 'coefficient' => 'decimal:3'];

    public function grid()
    {
        return $this->belongsTo(EvaluationGrid::class, 'evaluation_grid_id');
    }
}
