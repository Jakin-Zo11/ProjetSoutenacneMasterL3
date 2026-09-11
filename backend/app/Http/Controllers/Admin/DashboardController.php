<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Room;
use App\Models\Depot;
use App\Models\Soutenance;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Retourner les statistiques du tableau de bord.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function stats()
    {
        try {
            // Statistiques des étudiants
            $totalEtudiants = User::role('etudiant')->count();
            
            // Statistiques des enseignants/jurys
            $totalEnseignants = User::role(['enseignant', 'president_jury', 'rapporteur', 'examinateur'])->count();
            
            // Statistiques des salles
            $totalSalles = Room::count();
            $sallesDisponibles = Room::where('is_active', true)->count();
            
            // Statistiques des dépôts
            $depotsEnAttente = Depot::where('status', 'en_attente')->count();
            $depotsValides = Depot::where('status', 'valide')->count();
            $depotsRejetes = Depot::where('status', 'rejete')->count();
            $totalDepots = $depotsEnAttente + $depotsValides + $depotsRejetes;
            
            // Statistiques des soutenances
            $soutenancesPlanifiees = Soutenance::where('status', 'planifiee')->count();
            $soutenancesEnCours = Soutenance::where('status', 'en_cours')->count();
            $soutenancesTerminees = Soutenance::where('status', 'terminee')->count();
            $totalSoutenances = $soutenancesPlanifiees + $soutenancesEnCours + $soutenancesTerminees;
            
            return response()->json([
                'success' => true,
                'message' => 'Statistiques du tableau de bord récupérées.',
                'data' => [
                    'total_etudiants' => $totalEtudiants,
                    'total_enseignants' => $totalEnseignants,
                    'total_salles' => $totalSalles,
                    'salles_disponibles' => $sallesDisponibles,
                    'depots_stats' => [
                        'total' => $totalDepots,
                        'en_attente' => $depotsEnAttente,
                        'valides' => $depotsValides,
                        'rejetes' => $depotsRejetes,
                    ],
                    'soutenances_stats' => [
                        'total' => $totalSoutenances,
                        'planifiees' => $soutenancesPlanifiees,
                        'en_cours' => $soutenancesEnCours,
                        'terminees' => $soutenancesTerminees,
                    ],
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des statistiques.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
