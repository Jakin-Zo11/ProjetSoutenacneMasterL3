<?php

namespace App\Modules\Evaluation\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Evaluation\Models\DefenseEvaluation;
use App\Modules\Evaluation\Models\EvaluationGrid;
use App\Modules\Evaluation\Models\EvaluationScore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DefenseEvaluationController extends Controller
{
    public function assigned(Request $request)
    {
        return DefenseEvaluation::with(['grid.criteria', 'scores.criterion'])
            ->where('jury_id', $request->user()->id)
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        $this->requireJury($request);
        $data = $request->validate([
            'defense_id' => ['required', 'integer', 'min:1'],
            'evaluation_grid_id' => ['required', 'integer', 'exists:evaluation_grids,id'],
        ]);
        $grid = EvaluationGrid::findOrFail($data['evaluation_grid_id']);
        abort_unless($grid->is_active, 422, 'La grille sélectionnée est inactive.');

        $evaluation = DefenseEvaluation::firstOrCreate(
            ['defense_id' => $data['defense_id'], 'jury_id' => $request->user()->id],
            ['evaluation_grid_id' => $grid->id]
        );

        return response()->json($evaluation->load(['grid.criteria', 'scores.criterion']), $evaluation->wasRecentlyCreated ? 201 : 200);
    }

    public function show(Request $request, DefenseEvaluation $evaluation)
    {
        $this->canView($request, $evaluation);
        return $evaluation->load(['grid.criteria', 'scores.criterion', 'jury:id,name,email']);
    }

    public function saveScores(Request $request, DefenseEvaluation $evaluation)
    {
        $this->canEdit($request, $evaluation);
        $data = $request->validate([
            'comment' => ['nullable', 'string'],
            'scores' => ['required', 'array', 'min:1'],
            'scores.*.criterion_id' => ['required', 'integer', 'distinct'],
            'scores.*.score' => ['required', 'numeric', 'min:0'],
            'scores.*.comment' => ['nullable', 'string'],
        ]);

        $criteria = $evaluation->grid->criteria()->get()->keyBy('id');
        DB::transaction(function () use ($evaluation, $data, $criteria) {
            foreach ($data['scores'] as $item) {
                $criterion = $criteria->get($item['criterion_id']);
                if (!$criterion) {
                    abort(422, 'Un critère ne fait pas partie de cette grille.');
                }
                if ((float) $item['score'] > (float) $criterion->max_score) {
                    abort(422, "La note du critère {$criterion->name} dépasse son maximum.");
                }
                EvaluationScore::updateOrCreate(
                    ['defense_evaluation_id' => $evaluation->id, 'evaluation_criterion_id' => $criterion->id],
                    ['score' => $item['score'], 'weighted_score' => $item['score'] * $criterion->coefficient, 'comment' => $item['comment'] ?? null]
                );
            }
            $evaluation->update(['comment' => $data['comment'] ?? $evaluation->comment]);
            $this->recalculate($evaluation);
        });

        return $evaluation->fresh(['grid.criteria', 'scores.criterion']);
    }

    public function validateEvaluation(Request $request, DefenseEvaluation $evaluation)
    {
        $this->canEdit($request, $evaluation);
        $criterionIds = $evaluation->grid->criteria()->pluck('id')->sort()->values();
        $scoredIds = $evaluation->scores()->pluck('evaluation_criterion_id')->sort()->values();
        if ($criterionIds->isEmpty() || $criterionIds->all() !== $scoredIds->all()) {
        }
        $this->recalculate($evaluation);
        $evaluation->update(['status' => 'validated', 'validated_at' => now()]);

        return $evaluation->fresh(['grid.criteria', 'scores.criterion']);
    }

    public function lock(Request $request, DefenseEvaluation $evaluation)
    {
        abort_unless($request->user()->role === 'admin', 403, 'Action réservée à un administrateur.');
        abort_unless($evaluation->status === 'validated', 422, 'Seule une évaluation validée peut être verrouillée.');
        $evaluation->update(['status' => 'locked', 'locked_at' => now()]);

        return $evaluation->fresh(['grid.criteria', 'scores.criterion']);
    }

    private function recalculate(DefenseEvaluation $evaluation): void
    {
        $scores = $evaluation->scores()->get();
        $evaluation->update([
            'total_score' => $scores->sum('score'),
            'weighted_score' => $scores->sum('weighted_score'),
        ]);
    }

    private function canView(Request $request, DefenseEvaluation $evaluation): void
    {
        abort_unless($request->user()->role === 'admin' || $evaluation->jury_id === $request->user()->id, 403);
    }

    private function canEdit(Request $request, DefenseEvaluation $evaluation): void
    {
        $this->requireJury($request);
        abort_unless($evaluation->jury_id === $request->user()->id, 403, 'Cette évaluation appartient à un autre jury.');
        abort_if($evaluation->status !== 'draft', 422, 'Cette évaluation ne peut plus être modifiée.');
    }

    private function requireJury(Request $request): void
    {
        abort_unless(in_array($request->user()->role, ['jury', 'admin'], true), 403, 'Action réservée à un membre du jury.');
    }
}
