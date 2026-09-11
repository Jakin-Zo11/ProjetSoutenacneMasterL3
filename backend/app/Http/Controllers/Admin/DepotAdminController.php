<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Depot;
use Illuminate\Http\Request;

class DepotAdminController extends Controller
{
    /**
     * Afficher la liste des dépôts avec filtres.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $query = Depot::with(['etudiant', 'promotion']);

            // Filtre par statut
            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            // Filtre par promotion
            if ($request->has('promotion_id')) {
                $query->where('promotion_id', $request->promotion_id);
            }

            // Filtre par étudiant
            if ($request->has('etudiant_id')) {
                $query->where('etudiant_id', $request->etudiant_id);
            }

            // Filtre par nom de l'étudiant
            if ($request->has('etudiant_name')) {
                $query->whereHas('etudiant', function ($q) use ($request) {
                    $q->where('name', 'like', '%' . $request->etudiant_name . '%');
                });
            }

            $depots = $query->orderBy('created_at', 'desc')->get();

            return response()->json([
                'success' => true,
                'message' => 'Liste des dépôts récupérée avec succès.',
                'data' => $depots
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des dépôts.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour le statut d'un dépôt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Depot  $depot
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateStatut(Request $request, Depot $depot)
    {
        try {
            $validated = $request->validate([
                'status' => 'required|in:valide,rejete',
                'remarque' => 'nullable|string',
            ]);

            $depot->status = $validated['status'];
            $depot->remarque = $validated['remarque'] ?? null;
            $depot->validated_at = now();
            $depot->save();

            $depot->load(['etudiant', 'promotion']);

            return response()->json([
                'success' => true,
                'message' => 'Statut du dépôt mis à jour avec succès.',
                'data' => $depot
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
                'message' => 'Erreur lors de la mise à jour du statut.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Afficher les détails d'un dépôt.
     *
     * @param  \App\Models\Depot  $depot
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Depot $depot)
    {
        try {
            $depot->load(['etudiant', 'promotion', 'soutenances']);

            return response()->json([
                'success' => true,
                'message' => 'Détails du dépôt récupérés avec succès.',
                'data' => $depot
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération du dépôt.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
