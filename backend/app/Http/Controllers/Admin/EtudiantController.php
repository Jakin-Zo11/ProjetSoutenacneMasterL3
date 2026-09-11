<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class EtudiantController extends Controller
{
    /**
     * Afficher la liste des étudiants avec filtres.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $query = User::role('etudiant');

            // Filtre par nom
            if ($request->has('name')) {
                $query->where('name', 'like', '%' . $request->name . '%');
            }

            // Filtre par promotion
            if ($request->has('promotion_id')) {
                $query->whereHas('promotion', function ($q) use ($request) {
                    $q->where('id', $request->promotion_id);
                });
            }

            // Filtre par statut
            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            $etudiants = $query->with(['roles', 'promotion'])->get();

            return response()->json([
                'success' => true,
                'message' => 'Liste des étudiants récupérée avec succès.',
                'data' => $etudiants
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des étudiants.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Créer un nouvel étudiant.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:8',
                'telephone' => 'nullable|string',
                'matricule' => 'nullable|string|unique:users',
                'promotion_id' => 'nullable|exists:promotions,id',
            ]);

            $validated['password'] = bcrypt($validated['password']);
            $validated['status'] = 'actif';

            $user = User::create($validated);
            $user->assignRole('etudiant');

            $user->load(['roles', 'promotion']);

            return response()->json([
                'success' => true,
                'message' => 'Étudiant créé avec succès.',
                'data' => $user
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
                'message' => 'Erreur lors de la création de l\'étudiant.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Afficher un étudiant spécifique.
     *
     * @param  \App\Models\User  $etudiant
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(User $etudiant)
    {
        try {
            if (!$etudiant->hasRole('etudiant')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cet utilisateur n\'est pas un étudiant.'
                ], 404);
            }

            $etudiant->load(['roles', 'promotion']);

            return response()->json([
                'success' => true,
                'message' => 'Détails de l\'étudiant récupérés avec succès.',
                'data' => $etudiant
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération de l\'étudiant.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour un étudiant.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $etudiant
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, User $etudiant)
    {
        try {
            $validated = $request->validate([
                'name' => 'string',
                'email' => 'email|unique:users,email,' . $etudiant->id,
                'password' => 'string|min:8',
                'telephone' => 'nullable|string',
                'matricule' => 'nullable|string|unique:users,matricule,' . $etudiant->id,
                'promotion_id' => 'nullable|exists:promotions,id',
                'status' => 'in:actif,inactif',
            ]);

            if (isset($validated['password'])) {
                $validated['password'] = bcrypt($validated['password']);
            }

            $etudiant->update($validated);
            $etudiant->load(['roles', 'promotion']);

            return response()->json([
                'success' => true,
                'message' => 'Étudiant mis à jour avec succès.',
                'data' => $etudiant
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
                'message' => 'Erreur lors de la mise à jour de l\'étudiant.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer un étudiant.
     *
     * @param  \App\Models\User  $etudiant
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(User $etudiant)
    {
        try {
            if (!$etudiant->hasRole('etudiant')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cet utilisateur n\'est pas un étudiant.'
                ], 404);
            }

            $etudiant->delete();

            return response()->json([
                'success' => true,
                'message' => 'Étudiant supprimé avec succès.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression de l\'étudiant.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
