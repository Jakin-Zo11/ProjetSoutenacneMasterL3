<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\StudentRegistry;
use App\Rules\MatriculeMatchesMention;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function registrationOptions()
    {
        $mentions = collect(config('student.mentions'))
            ->map(fn (array $config, string $key) => [
                'value' => $key,
                'label' => $config['label'],
                'matricule_example' => $config['matricule_example'],
            ])
            ->values();

        $parcours = collect(config('student.parcours'))
            ->map(fn (string $label, string $value) => [
                'value' => $value,
                'label' => $label,
            ])
            ->values();

        return response()->json([
            'mentions' => $mentions,
            'parcours' => $parcours,
        ]);
    }

    public function register(Request $request)
    {
        $mentionKeys = array_keys(config('student.mentions'));
        $parcoursKeys = array_keys(config('student.parcours'));
        $currentYear = (int) date('Y');

        $data = $request->validate([
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'matricule' => ['required', 'string', 'max:20'],
        ]);

        $registry = StudentRegistry::where('matricule', strtoupper(trim($data['matricule'])))
            ->whereNull('user_id')
            ->first();

        if (!$registry) {
            return response()->json(['message' => 'Aucun étudiant disponible pour ce matricule, ou ce matricule possède déjà un compte.'], 422);
        }

        if (!in_array($registry->mention, $mentionKeys, true) || !in_array($registry->parcours, $parcoursKeys, true)) {
            return response()->json(['message' => 'La fiche de cet étudiant contient des informations d’inscription invalides.'], 422);
        }

        $request->validate([
            'matricule' => [new MatriculeMatchesMention($registry->mention, $registry->admission_year)],
        ]);

        $user = User::create([
            'name' => $registry->name,
            'email' => strtolower($data['email']),
            'password' => Hash::make($data['password']),
            'role' => 'student',
            'matricule' => $registry->matricule,
            'mention' => $registry->mention,
            'parcours' => $registry->parcours,
            'admission_year' => $registry->admission_year,
            'student_status' => 'pending',
        ]);

        $registry->update(['user_id' => $user->id]);

        return response()->json([
            'message' => 'Inscription enregistrée. Votre compte est en attente de validation par l’administration.',
            'user' => $user,
            'student_status' => 'pending',
        ], 201);
    }

    public function findStudentByMatricule(Request $request)
    {
        $data = $request->validate([
            'matricule' => ['required', 'string', 'max:20'],
        ]);

        $registry = StudentRegistry::where('matricule', strtoupper(trim($data['matricule'])))
            ->whereNull('user_id')
            ->first();

        if (!$registry) {
            return response()->json(['message' => 'Aucun étudiant trouvé pour ce matricule.'], 404);
        }

        return response()->json([
            'student' => $registry->only(['matricule', 'name', 'mention', 'parcours', 'admission_year']),
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Identifiants invalides',
            ], 401);
        }

        if ($user->role === 'student') {
            if ($user->student_status === 'pending') {
                return response()->json([
                    'message' => 'Votre compte est en attente de validation par l’administration.',
                    'student_status' => 'pending',
                    'user' => $user,
                ], 403);
            }

            if ($user->student_status === 'rejected') {
                return response()->json([
                    'message' => 'Votre inscription a été refusée. Contactez l’administration.',
                    'student_status' => 'rejected',
                    'user' => $user,
                ], 403);
            }
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie',
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }
}
