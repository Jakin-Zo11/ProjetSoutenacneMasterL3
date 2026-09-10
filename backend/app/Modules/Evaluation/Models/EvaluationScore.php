<?php

namespace App\Modules\Evaluation\Models;

use Illuminate\Database\Eloquent\Model;

class EvaluationScore extends Model
{
    protected $fillable = ['defense_evaluation_id', 'evaluation_criterion_id', 'score', 'weighted_score', 'comment'];
    protected $casts = ['score' => 'decimal:2', 'weighted_score' => 'decimal:4'];

    public function evaluation()
    {
        return $this->belongsTo(DefenseEvaluation::class, 'defense_evaluation_id');
    }

    public function criterion()
    {
        return $this->belongsTo(EvaluationCriterion::class, 'evaluation_criterion_id');
    }
}
