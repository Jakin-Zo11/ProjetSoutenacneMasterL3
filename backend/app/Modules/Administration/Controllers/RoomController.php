<?php

namespace App\Modules\Administration\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Administration\Requests\RoomRequest;
use App\Modules\Administration\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = Room::all();
        return response()->json([
            'success' => true,
            'message' => 'Liste des salles récupérée avec succès.',
            'data' => $rooms
        ]);
    }

    public function store(RoomRequest $request)
    {
        $room = Room::create($request->validated());
        
        return response()->json([
            'success' => true,
            'message' => 'Salle créée avec succès.',
            'data' => $room
        ], 201);
    }

    public function show($id)
    {
        $room = Room::find($id);

        if (!$room) {
            return response()->json([
                'success' => false,
                'message' => 'Salle non trouvée.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Détails de la salle récupérés.',
            'data' => $room
        ]);
    }

    public function update(RoomRequest $request, $id)
    {
        $room = Room::find($id);

        if (!$room) {
            return response()->json([
                'success' => false,
                'message' => 'Salle non trouvée.'
            ], 404);
        }

        $room->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Salle mise à jour avec succès.',
            'data' => $room
        ]);
    }

    public function destroy($id)
    {
        $room = Room::find($id);

        if (!$room) {
            return response()->json([
                'success' => false,
                'message' => 'Salle non trouvée.'
            ], 404);
        }

        $room->delete();

        return response()->json([
            'success' => true,
            'message' => 'Salle supprimée avec succès.'
        ]);
    }
}
