<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Soutenance;
use Illuminate\Http\Request;

class SoutenanceAdminController extends Controller
{
    /**
     * Afficher la liste des soutenances avec filtres.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $query = Soutenance::with(['depot.etudiant', 'depot.promotion', 'sessionSoutenance', 'room']);

            // Filtre par statut
            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            // Filtre par session de soutenance
            if ($request->has('session_soutenance_id')) {
                $query->where('session_soutenance_id', $request->session_soutenance_id);
            }

            // Filtre par salle
            if ($request->has('room_id')) {
                $query->where('room_id', $request->room_id);
            }

            // Filtre par date
            if ($request->has('date')) {
                $query->whereDate('date', $request->date);
            }

            $soutenances = $query->orderBy('date', 'asc')->get();

            return response()->json([
                'success' => true,
                'message' => 'Liste des soutenances récupérée avec succès.',
                'data' => $soutenances
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des soutenances.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour le planning d'une soutenance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Soutenance  $soutenance
     * @return \Illuminate\Http\JsonResponse
     */
    public function updatePlanning(Request $request, Soutenance $soutenance)
    {
        try {
            $validated = $request->validate([
                'date' => 'nullable|date',
                'room_id' => 'nullable|exists:rooms,id',
                'remarques' => 'nullable|string',
            ]);

            if (isset($validated['date'])) {
                $soutenance->date = $validated['date'];
            }

            if (isset($validated['room_id'])) {
                $soutenance->room_id = $validated['room_id'];
            }

            if (isset($validated['remarques'])) {
                $soutenance->remarques = $validated['remarques'];
            }

            $soutenance->save();

            $soutenance->load(['depot.etudiant', 'depot.promotion', 'sessionSoutenance', 'room']);

            return response()->json([
                'success' => true,
                'message' => 'Planning de la soutenance mis à jour avec succès.',
                'data' => $soutenance
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
                'message' => 'Erreur lors de la mise à jour du planning.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Afficher les détails d'une soutenance.
     *
     * @param  \App\Models\Soutenance  $soutenance
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Soutenance $soutenance)
    {
        try {
            $soutenance->load(['depot.etudiant', 'depot.promotion', 'sessionSoutenance', 'room']);

            return response()->json([
                'success' => true,
                'message' => 'Détails de la soutenance récupérés avec succès.',
                'data' => $soutenance
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération de la soutenance.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
