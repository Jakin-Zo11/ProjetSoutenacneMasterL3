<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StudentNotification;
use App\Models\StudentRegistry;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminStudentController extends Controller
{
    public function pending(Request $request)
    {
        $this->requireAdmin($request);

        $students = User::query()
            ->where('role', 'student')
            ->where('student_status', 'pending')
            ->orderBy('created_at')
            ->get(['id', 'name', 'email', 'matricule', 'mention', 'parcours', 'admission_year', 'student_status', 'created_at']);

        return response()->json(['students' => $students]);
    }

    public function addToRegistry(Request $request)
    {
        $this->requireAdmin($request);

        $data = $request->validate([
            'matricule' => ['required', 'string', 'max:20', 'unique:student_registry,matricule', 'unique:users,matricule'],
            'name' => ['required', 'string', 'max:255'],
            'mention' => ['required', Rule::in(array_keys(config('student.mentions')))],
            'parcours' => ['required', Rule::in(array_keys(config('student.parcours')))],
            'admission_year' => ['required', 'integer', 'min:2000', 'max:' . date('Y')],
        ]);

        $registry = StudentRegistry::create([
            ...$data,
            'matricule' => strtoupper(trim($data['matricule'])),
        ]);

        return response()->json(['student' => $registry], 201);
    }

    public function approve(Request $request, User $user)
    {
        $this->requireAdmin($request);
        $this->ensurePendingStudent($user);

        $user->update(['student_status' => 'approved']);

        StudentNotification::create([
            'user_id' => $user->id,
            'title' => 'Compte validé',
            'message' => 'Votre inscription a été validée. Vous pouvez accéder à votre espace étudiant.',
        ]);

        return response()->json([
            'message' => 'Inscription étudiante validée.',
            'user' => $user->fresh(),
        ]);
    }

    public function reject(Request $request, User $user)
    {
        $this->requireAdmin($request);
        $this->ensurePendingStudent($user);

        $data = $request->validate([
            'reason' => ['nullable', 'string', 'max:500'],
        ]);

        $user->update(['student_status' => 'rejected']);

        StudentNotification::create([
            'user_id' => $user->id,
            'title' => 'Inscription refusée',
            'message' => $data['reason']
                ?? 'Votre demande d’inscription n’a pas pu être validée. Contactez l’administration.',
        ]);

        return response()->json([
            'message' => 'Inscription étudiante refusée.',
            'user' => $user->fresh(),
        ]);
    }

    private function requireAdmin(Request $request): void
    {
        abort_unless($request->user()->role === 'admin', 403, 'Action réservée à un administrateur.');
    }

    private function ensurePendingStudent(User $user): void
    {
        abort_unless($user->role === 'student', 404, 'Étudiant introuvable.');
        abort_unless($user->student_status === 'pending', 409, 'Cette inscription n’est plus en attente.');
    }
}
