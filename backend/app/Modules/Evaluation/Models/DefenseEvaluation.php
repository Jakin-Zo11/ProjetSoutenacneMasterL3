<?php

namespace App\Modules\Evaluation\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class DefenseEvaluation extends Model
{
    protected $fillable = ['defense_id', 'jury_id', 'evaluation_grid_id', 'status', 'total_score', 'weighted_score', 'comment', 'validated_at', 'locked_at'];
    protected $casts = ['total_score' => 'decimal:2', 'weighted_score' => 'decimal:4', 'validated_at' => 'datetime', 'locked_at' => 'datetime'];

    public function grid()
    {
        return $this->belongsTo(EvaluationGrid::class, 'evaluation_grid_id');
    }

    public function jury()
    {
        return $this->belongsTo(User::class, 'jury_id');
    }

    public function scores()
    {
        return $this->hasMany(EvaluationScore::class);
    }
}
