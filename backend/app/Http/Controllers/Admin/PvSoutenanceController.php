<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Evaluation;
use App\Models\Soutenance;
use Illuminate\Http\Request;

class PvSoutenanceController extends Controller
{
    /**
     * Générer le Procès-Verbal d'une soutenance.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPv($id)
    {
        try {
            $soutenance = Soutenance::with(['depot.etudiant', 'depot.promotion', 'sessionSoutenance', 'room', 'evaluations.juryUser'])
                ->find($id);

            if (!$soutenance) {
                return response()->json([
                    'success' => false,
                    'message' => 'Soutenance non trouvée.'
                ], 404);
            }

            // Vérifier si des évaluations existent
            if ($soutenance->evaluations->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Aucune évaluation trouvée pour cette soutenance.'
                ], 400);
            }

            // Calculer la moyenne des notes finales
            $evaluationsValidees = $soutenance->evaluations->where('status', 'valide');
            
            if ($evaluationsValidees->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Aucune évaluation validée trouvée.'
                ], 400);
            }

            $moyenne = $evaluationsValidees->avg('note_finale');
            $mention = $this->determinerMention($moyenne);

            // Structure du PV
            $pv = [
                'soutenance' => [
                    'id' => $soutenance->id,
                    'date' => $soutenance->date->format('d/m/Y H:i'),
                    'salle' => $soutenance->room ? $soutenance->room->name : 'Non définie',
                    'session' => $soutenance->sessionSoutenance ? $soutenance->sessionSoutenance->title : 'Non définie',
                ],
                'etudiant' => [
                    'id' => $soutenance->depot->etudiant->id,
                    'nom' => $soutenance->depot->etudiant->name,
                    'email' => $soutenance->depot->etudiant->email,
                    'matricule' => $soutenance->depot->etudiant->matricule,
                ],
                'memoire' => [
                    'titre' => $soutenance->depot->title,
                    'promotion' => $soutenance->depot->promotion ? $soutenance->depot->promotion->name : 'Non définie',
                ],
                'evaluations' => $evaluationsValidees->map(function ($evaluation) {
                    return [
                        'jury' => $evaluation->juryUser->name,
                        'note_presentation' => $evaluation->note_presentation,
                        'note_manuscrit' => $evaluation->note_manuscrit,
                        'note_reponses' => $evaluation->note_reponses,
                        'note_finale' => $evaluation->note_finale,
                        'remarques' => $evaluation->remarques,
                    ];
                }),
                'resultat' => [
                    'moyenne' => round($moyenne, 2),
                    'mention' => $mention,
                ],
                'statut_soutenance' => $soutenance->status,
            ];

            return response()->json([
                'success' => true,
                'message' => 'Procès-Verbal généré avec succès.',
                'data' => $pv
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la génération du Procès-Verbal.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Déterminer la mention en fonction de la moyenne.
     *
     * @param  float  $moyenne
     * @return string
     */
    private function determinerMention($moyenne)
    {
        if ($moyenne >= 16) {
            return 'Très Bien';
        } elseif ($moyenne >= 14) {
            return 'Bien';
        } elseif ($moyenne >= 12) {
            return 'Assez Bien';
        } elseif ($moyenne >= 10) {
            return 'Passable';
        } else {
            return 'Insuffisant';
        }
    }

    /**
     * Clôturer une soutenance et verrouiller les notes.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function cloturer($id)
    {
        try {
            $soutenance = Soutenance::with('evaluations')->find($id);

            if (!$soutenance) {
                return response()->json([
                    'success' => false,
                    'message' => 'Soutenance non trouvée.'
                ], 404);
            }

            // Vérifier si la soutenance est déjà clôturée
            if ($soutenance->status === 'terminee') {
                return response()->json([
                    'success' => false,
                    'message' => 'La soutenance est déjà clôturée.'
                ], 400);
            }

            // Vérifier si toutes les évaluations sont validées
            $evaluationsNonValidees = $soutenance->evaluations->where('status', 'brouillon');
            
            if ($evaluationsNonValidees->isNotEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Certaines évaluations ne sont pas encore validées.',
                    'data' => [
                        'evaluations_en_attente' => $evaluationsNonValidees->count(),
                    ]
                ], 400);
            }

            // Clôturer la soutenance
            $soutenance->status = 'terminee';
            $soutenance->save();

            return response()->json([
                'success' => true,
                'message' => 'Soutenance clôturée avec succès. Les notes sont maintenant verrouillées.',
                'data' => $soutenance
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la clôture de la soutenance.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
