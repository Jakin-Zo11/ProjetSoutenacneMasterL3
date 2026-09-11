<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SessionSoutenance;
use Illuminate\Http\Request;

class SessionSoutenanceController extends Controller
{
    /**
     * Afficher la liste des sessions de soutenance.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $sessions = SessionSoutenance::all();
            return response()->json([
                'success' => true,
                'message' => 'Liste des sessions de soutenance récupérée avec succès.',
                'data' => $sessions
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des sessions de soutenance.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Créer une nouvelle session de soutenance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string',
                'start_date' => 'required|date',
                'end_date' => 'required|date|after_or_equal:start_date',
                'status' => 'in:planifiee,en_cours,terminee',
            ]);

            $session = SessionSoutenance::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Session de soutenance créée avec succès.',
                'data' => $session
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
                'message' => 'Erreur lors de la création de la session de soutenance.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Afficher une session de soutenance spécifique.
     *
     * @param  \App\Models\SessionSoutenance  $sessionSoutenance
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(SessionSoutenance $sessionSoutenance)
    {
        try {
            return response()->json([
                'success' => true,
                'message' => 'Détails de la session de soutenance récupérés avec succès.',
                'data' => $sessionSoutenance
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération de la session de soutenance.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour une session de soutenance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SessionSoutenance  $sessionSoutenance
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, SessionSoutenance $sessionSoutenance)
    {
        try {
            $validated = $request->validate([
                'title' => 'string',
                'start_date' => 'date',
                'end_date' => 'date|after_or_equal:start_date',
                'status' => 'in:planifiee,en_cours,terminee',
            ]);

            $sessionSoutenance->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Session de soutenance mise à jour avec succès.',
                'data' => $sessionSoutenance
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
                'message' => 'Erreur lors de la mise à jour de la session de soutenance.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer une session de soutenance.
     *
     * @param  \App\Models\SessionSoutenance  $sessionSoutenance
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(SessionSoutenance $sessionSoutenance)
    {
        try {
            $sessionSoutenance->delete();

            return response()->json([
                'success' => true,
                'message' => 'Session de soutenance supprimée avec succès.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression de la session de soutenance.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
