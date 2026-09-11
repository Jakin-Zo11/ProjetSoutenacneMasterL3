<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Formation;
use Illuminate\Http\Request;

class FormationController extends Controller
{
    /**
     * Afficher la liste des formations.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $formations = Formation::with('promotions')->get();
            return response()->json([
                'success' => true,
                'message' => 'Liste des formations récupérée avec succès.',
                'data' => $formations
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des formations.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Créer une nouvelle formation.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'code' => 'required|string|unique:formations',
                'name' => 'required|string',
                'description' => 'nullable|string',
            ]);

            $formation = Formation::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Formation créée avec succès.',
                'data' => $formation
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation.',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de la formation.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Afficher une formation spécifique.
     *
     * @param  \App\Models\Formation  $formation
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Formation $formation)
    {
        try {
            $formation->load('promotions');
            return response()->json([
                'success' => true,
                'message' => 'Détails de la formation récupérés avec succès.',
                'data' => $formation
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération de la formation.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour une formation.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Formation  $formation
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Formation $formation)
    {
        try {
            $validated = $request->validate([
                'code' => 'string|unique:formations,code,' . $formation->id,
                'name' => 'string',
                'description' => 'nullable|string',
            ]);

            $formation->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Formation mise à jour avec succès.',
                'data' => $formation
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation.',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour de la formation.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer une formation.
     *
     * @param  \App\Models\Formation  $formation
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Formation $formation)
    {
        try {
            $formation->delete();

            return response()->json([
                'success' => true,
                'message' => 'Formation supprimée avec succès.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression de la formation.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
