<?php

namespace App\Modules\Evaluation\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Evaluation\Models\EvaluationCriterion;
use App\Modules\Evaluation\Models\EvaluationGrid;
use App\Modules\Evaluation\Models\EvaluationScore;
use Illuminate\Http\Request;

class EvaluationGridController extends Controller
{
    public function index()
    {
        return EvaluationGrid::with('criteria')->orderBy('name')->get();
    }

    public function store(Request $request)
    {
        $this->requireAdmin($request);
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        return response()->json(EvaluationGrid::create($data), 201);
    }

    public function show(EvaluationGrid $evaluationGrid)
    {
        return $evaluationGrid->load('criteria');
    }

    public function update(Request $request, EvaluationGrid $evaluationGrid)
    {
        $this->requireAdmin($request);
        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'is_active' => ['sometimes', 'boolean'],
        ]);
        $evaluationGrid->update($data);

        return $evaluationGrid->fresh('criteria');
    }

    public function destroy(Request $request, EvaluationGrid $evaluationGrid)
    {
        $this->requireAdmin($request);
        if ($evaluationGrid->evaluations()->exists()) {
            return response()->json(['message' => 'Cette grille est déjà utilisée et ne peut pas être supprimée.'], 422);
        }
        $evaluationGrid->delete();

        return response()->noContent();
    }

    public function addCriterion(Request $request, EvaluationGrid $evaluationGrid)
    {
        $this->requireAdmin($request);
        $data = $this->criterionData($request);
        $data['evaluation_grid_id'] = $evaluationGrid->id;

        return response()->json(EvaluationCriterion::create($data), 201);
    }

    public function updateCriterion(Request $request, EvaluationCriterion $criterion)
    {
        $this->requireAdmin($request);
        $criterion->update($this->criterionData($request, true));

        return $criterion->fresh();
    }

    public function destroyCriterion(Request $request, EvaluationCriterion $criterion)
    {
        $this->requireAdmin($request);
        if (EvaluationScore::where('evaluation_criterion_id', $criterion->id)->exists()) {
            return response()->json(['message' => 'Ce critère est déjà utilisé et ne peut pas être supprimé.'], 422);
        }
        $criterion->delete();

        return response()->noContent();
    }

    private function criterionData(Request $request, bool $partial = false): array
    {
        return $request->validate([
            'name' => [$partial ? 'sometimes' : 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'max_score' => [$partial ? 'sometimes' : 'required', 'numeric', 'gt:0', 'max:100000'],
            'coefficient' => [$partial ? 'sometimes' : 'required', 'numeric', 'gt:0', 'max:100000'],
            'position' => ['sometimes', 'integer', 'min:0'],
        ]);
    }

    private function requireAdmin(Request $request): void
    {
        abort_unless($request->user()->role === 'admin', 403, 'Action réservée à un administrateur.');
    }
}
