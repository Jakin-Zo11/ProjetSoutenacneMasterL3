<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StudentNotification;
use App\Models\StudentDeviceToken;
use App\Models\StudentSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class StudentController extends Controller
{
    private const FILE_TYPES = [
        'theme_file',
        'thesis_file',
        'project_description_file',
    ];

    public function profile(Request $request)
    {
        $this->ensureStudent($request);

        return response()->json(['user' => $request->user()]);
    }

    public function updateProfile(Request $request)
    {
        $this->ensureStudent($request);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($request->user()->id),
            ],
        ]);

        $request->user()->update($data);

        return response()->json(['user' => $request->user()->fresh()]);
    }

    public function submission(Request $request)
    {
        $this->ensureStudent($request);

        $submission = StudentSubmission::with('files')
            ->where('user_id', $request->user()->id)
            ->first();

        return response()->json(['submission' => $submission]);
    }

    public function saveSubmission(Request $request)
    {
        $this->ensureStudent($request);

        $submission = StudentSubmission::firstOrCreate([
            'user_id' => $request->user()->id,
        ], [
            'status' => 'draft',
        ]);

        if ($submission->status !== 'draft') {
            return response()->json([
                'message' => 'Un dépôt soumis ne peut plus être modifié.',
            ], 409);
        }

        $data = $request->validate([
            'title' => ['sometimes', 'nullable', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string', 'max:10000'],
            'theme_file' => ['sometimes', 'file', 'mimes:pdf,doc,docx', 'max:10240'],
            'thesis_file' => ['sometimes', 'file', 'mimes:pdf,doc,docx', 'max:20480'],
            'project_description_file' => ['sometimes', 'file', 'mimes:pdf,doc,docx', 'max:10240'],
        ]);

        $submission->update(collect($data)->except(self::FILE_TYPES)->all());

        foreach (self::FILE_TYPES as $inputName) {
            if (!$request->hasFile($inputName)) {
                continue;
            }

            $file = $request->file($inputName);
            $oldFile = $submission->files()->where('type', $inputName)->first();

            if ($oldFile) {
                Storage::disk('local')->delete($oldFile->path);
                $oldFile->delete();
            }

            $path = $file->store('student-submissions/' . $request->user()->id);
            $submission->files()->create([
                'type' => $inputName,
                'original_name' => $file->getClientOriginalName(),
                'path' => $path,
                'mime_type' => $file->getClientMimeType(),
                'size' => $file->getSize(),
            ]);
        }

        return response()->json([
            'message' => 'Dépôt enregistré en brouillon.',
            'submission' => $submission->fresh('files'),
        ], 201);
    }

    public function submitSubmission(Request $request)
    {
        $this->ensureStudent($request);

        $submission = StudentSubmission::with('files')
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$submission) {
            return response()->json(['message' => 'Aucun dépôt à soumettre.'], 422);
        }

        if ($submission->status !== 'draft') {
            return response()->json(['message' => 'Ce dépôt a déjà été soumis.'], 409);
        }

        $fileTypes = $submission->files->pluck('type');
        $missingTypes = collect(self::FILE_TYPES)->diff($fileTypes)->values();

        if ($submission->title === null || $missingTypes->isNotEmpty()) {
            return response()->json([
                'message' => 'Le dépôt doit contenir un titre et les trois documents requis.',
                'missing_files' => $missingTypes,
            ], 422);
        }

        $submission->update([
            'status' => 'submitted',
            'submitted_at' => now(),
        ]);

        return response()->json([
            'message' => 'Dépôt soumis avec succès.',
            'submission' => $submission->fresh('files'),
        ]);
    }

    public function downloadFile(Request $request, int $file)
    {
        $this->ensureStudent($request);

        $submission = $request->user()->studentSubmission;
        abort_if(!$submission, 404, 'Dépôt introuvable.');

        $submissionFile = $submission->files()->findOrFail($file);

        if (!Storage::disk('local')->exists($submissionFile->path)) {
            return response()->json(['message' => 'Fichier introuvable.'], 404);
        }

        return response()->download(
            Storage::path($submissionFile->path),
            $submissionFile->original_name
        );
    }

    public function notifications(Request $request)
    {
        $this->ensureStudent($request);

        $notifications = StudentNotification::where('user_id', $request->user()->id)
            ->latest()
            ->paginate(20);

        return response()->json($notifications);
    }

    public function markNotificationAsRead(Request $request, int $notification)
    {
        $this->ensureStudent($request);

        $studentNotification = StudentNotification::where('user_id', $request->user()->id)
            ->findOrFail($notification);
        $studentNotification->update(['read_at' => now()]);

        return response()->json(['notification' => $studentNotification->fresh()]);
    }

    public function registerPushToken(Request $request)
    {
        $this->ensureStudent($request);

        $data = $request->validate([
            'token' => ['required', 'string', 'max:500'],
            'platform' => ['required', 'string', 'in:expo,ios,android'],
        ]);

        StudentDeviceToken::updateOrCreate(
            ['token' => $data['token']],
            ['user_id' => $request->user()->id, 'platform' => $data['platform']]
        );

        return response()->json(['message' => 'Jeton push enregistré.']);
    }

    private function ensureStudent(Request $request): void
    {
        abort_unless(in_array($request->user()->role, ['student', 'etudiant'], true), 403);
    }
}
