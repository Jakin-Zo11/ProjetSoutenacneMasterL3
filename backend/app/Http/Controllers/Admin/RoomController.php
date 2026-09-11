<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /**
     * Afficher la liste des salles.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $rooms = Room::all();
            return response()->json([
                'success' => true,
                'message' => 'Liste des salles récupérée avec succès.',
                'data' => $rooms
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des salles.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Créer une nouvelle salle.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'capacity' => 'required|integer|min:1',
                'is_active' => 'boolean',
            ]);

            $room = Room::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Salle créée avec succès.',
                'data' => $room
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
                'message' => 'Erreur lors de la création de la salle.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Afficher une salle spécifique.
     *
     * @param  \App\Models\Room  $room
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Room $room)
    {
        try {
            return response()->json([
                'success' => true,
                'message' => 'Détails de la salle récupérés avec succès.',
                'data' => $room
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération de la salle.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour une salle.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Room  $room
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Room $room)
    {
        try {
            $validated = $request->validate([
                'name' => 'string',
                'capacity' => 'integer|min:1',
                'is_active' => 'boolean',
            ]);

            $room->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Salle mise à jour avec succès.',
                'data' => $room
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
                'message' => 'Erreur lors de la mise à jour de la salle.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer une salle.
     *
     * @param  \App\Models\Room  $room
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Room $room)
    {
        try {
            $room->delete();

            return response()->json([
                'success' => true,
                'message' => 'Salle supprimée avec succès.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression de la salle.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
