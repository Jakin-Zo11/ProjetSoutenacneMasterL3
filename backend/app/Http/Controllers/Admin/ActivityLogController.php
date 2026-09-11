<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    /**
     * Afficher la liste des logs d'activité avec pagination et filtres.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $query = ActivityLog::with('user');

            // Filtre par utilisateur
            if ($request->has('user_id')) {
                $query->where('user_id', $request->user_id);
            }

            // Filtre par type d'action
            if ($request->has('action')) {
                $query->where('action', 'like', '%' . $request->action . '%');
            }

            // Filtre par date de début
            if ($request->has('date_from')) {
                $query->whereDate('created_at', '>=', $request->date_from);
            }

            // Filtre par date de fin
            if ($request->has('date_to')) {
                $query->whereDate('created_at', '<=', $request->date_to);
            }

            // Pagination
            $perPage = $request->get('per_page', 15);
            $logs = $query->orderBy('created_at', 'desc')->paginate($perPage);

            return response()->json([
                'success' => true,
                'message' => 'Logs d\'activité récupérés avec succès.',
                'data' => $logs
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des logs d\'activité.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Afficher les détails d'un log d'activité.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $log = ActivityLog::with('user')->find($id);

            if (!$log) {
                return response()->json([
                    'success' => false,
                    'message' => 'Log d\'activité non trouvé.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Détails du log d\'activité récupérés avec succès.',
                'data' => $log
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération du log d\'activité.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
