<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class EnseignantController extends Controller
{
    /**
     * Afficher la liste des enseignants/membres de jury avec filtres.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $query = User::role(['enseignant', 'president_jury', 'rapporteur', 'examinateur']);

            // Filtre par nom
            if ($request->has('name')) {
                $query->where('name', 'like', '%' . $request->name . '%');
            }

            // Filtre par rôle spécifique
            if ($request->has('role')) {
                $query->role($request->role);
            }

            // Filtre par statut
            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            $enseignants = $query->with('roles')->get();

            return response()->json([
                'success' => true,
                'message' => 'Liste des enseignants récupérée avec succès.',
                'data' => $enseignants
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des enseignants.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Créer un nouvel enseignant/membre de jury.
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
                'role' => 'required|in:enseignant,president_jury,rapporteur,examinateur',
            ]);

            $validated['password'] = bcrypt($validated['password']);
            $validated['status'] = 'actif';

            $user = User::create($validated);
            $user->assignRole($validated['role']);

            $user->load('roles');

            return response()->json([
                'success' => true,
                'message' => 'Enseignant créé avec succès.',
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
                'message' => 'Erreur lors de la création de l\'enseignant.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Afficher un enseignant spécifique.
     *
     * @param  \App\Models\User  $enseignant
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(User $enseignant)
    {
        try {
            if (!$enseignant->hasRole(['enseignant', 'president_jury', 'rapporteur', 'examinateur'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cet utilisateur n\'est pas un enseignant ou membre de jury.'
                ], 404);
            }

            $enseignant->load('roles');

            return response()->json([
                'success' => true,
                'message' => 'Détails de l\'enseignant récupérés avec succès.',
                'data' => $enseignant
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération de l\'enseignant.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour un enseignant.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $enseignant
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, User $enseignant)
    {
        try {
            $validated = $request->validate([
                'name' => 'string',
                'email' => 'email|unique:users,email,' . $enseignant->id,
                'password' => 'string|min:8',
                'telephone' => 'nullable|string',
                'role' => 'in:enseignant,president_jury,rapporteur,examinateur',
                'status' => 'in:actif,inactif',
            ]);

            if (isset($validated['password'])) {
                $validated['password'] = bcrypt($validated['password']);
            }

            if (isset($validated['role'])) {
                $enseignant->syncRoles([$validated['role']]);
                unset($validated['role']);
            }

            $enseignant->update($validated);
            $enseignant->load('roles');

            return response()->json([
                'success' => true,
                'message' => 'Enseignant mis à jour avec succès.',
                'data' => $enseignant
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
                'message' => 'Erreur lors de la mise à jour de l\'enseignant.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer un enseignant.
     *
     * @param  \App\Models\User  $enseignant
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(User $enseignant)
    {
        try {
            if (!$enseignant->hasRole(['enseignant', 'president_jury', 'rapporteur', 'examinateur'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cet utilisateur n\'est pas un enseignant ou membre de jury.'
                ], 404);
            }

            $enseignant->delete();

            return response()->json([
                'success' => true,
                'message' => 'Enseignant supprimé avec succès.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression de l\'enseignant.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
