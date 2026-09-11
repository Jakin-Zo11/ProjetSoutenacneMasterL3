<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Promotion;
use Illuminate\Http\Request;

class PromotionController extends Controller
{
    /**
     * Afficher la liste des promotions.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $promotions = Promotion::with('formation')->get();
            return response()->json([
                'success' => true,
                'message' => 'Liste des promotions récupérée avec succès.',
                'data' => $promotions
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des promotions.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Créer une nouvelle promotion.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'formation_id' => 'required|exists:formations,id',
                'year' => 'required|string',
                'name' => 'required|string',
            ]);

            $promotion = Promotion::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Promotion créée avec succès.',
                'data' => $promotion
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
                'message' => 'Erreur lors de la création de la promotion.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Afficher une promotion spécifique.
     *
     * @param  \App\Models\Promotion  $promotion
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Promotion $promotion)
    {
        try {
            $promotion->load('formation');
            return response()->json([
                'success' => true,
                'message' => 'Détails de la promotion récupérés avec succès.',
                'data' => $promotion
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération de la promotion.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour une promotion.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Promotion  $promotion
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Promotion $promotion)
    {
        try {
            $validated = $request->validate([
                'formation_id' => 'exists:formations,id',
                'year' => 'string',
                'name' => 'string',
            ]);

            $promotion->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Promotion mise à jour avec succès.',
                'data' => $promotion
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
                'message' => 'Erreur lors de la mise à jour de la promotion.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer une promotion.
     *
     * @param  \App\Models\Promotion  $promotion
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Promotion $promotion)
    {
        try {
            $promotion->delete();

            return response()->json([
                'success' => true,
                'message' => 'Promotion supprimée avec succès.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression de la promotion.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
