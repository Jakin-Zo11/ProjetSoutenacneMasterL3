<?php

namespace App\Modules\Administration\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Administration\Requests\FormationRequest;
use App\Modules\Administration\Models\Formation;
use Illuminate\Http\Request;

class FormationController extends Controller
{
    public function index()
    {
        $formations = Formation::all();
        return response()->json([
            'success' => true,
            'message' => 'Liste des formations récupérée avec succès.',
            'data' => $formations
        ]);
    }

    public function store(FormationRequest $request)
    {
        $formation = Formation::create($request->validated());
        
        return response()->json([
            'success' => true,
            'message' => 'Formation créée avec succès.',
            'data' => $formation
        ], 201);
    }

    public function show($id)
    {
        $formation = Formation::find($id);

        if (!$formation) {
            return response()->json([
                'success' => false,
                'message' => 'Formation non trouvée.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Détails de la formation récupérés.',
            'data' => $formation
        ]);
    }

    public function update(FormationRequest $request, $id)
    {
        $formation = Formation::find($id);

        if (!$formation) {
            return response()->json([
                'success' => false,
                'message' => 'Formation non trouvée.'
            ], 404);
        }

        $formation->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Formation mise à jour avec succès.',
            'data' => $formation
        ]);
    }

    public function destroy($id)
    {
        $formation = Formation::find($id);

        if (!$formation) {
            return response()->json([
                'success' => false,
                'message' => 'Formation non trouvée.'
            ], 404);
        }

        $formation->delete();

        return response()->json([
            'success' => true,
            'message' => 'Formation supprimée avec succès.'
        ]);
    }
}
