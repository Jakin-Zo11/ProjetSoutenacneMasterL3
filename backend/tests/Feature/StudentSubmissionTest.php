<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class StudentSubmissionTest extends TestCase
{
    use RefreshDatabase;

    public function test_student_can_register_and_receive_a_token(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Nouvel étudiant',
            'email' => 'etudiant@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertCreated()
            ->assertJsonPath('user.email', 'etudiant@example.com')
            ->assertJsonPath('user.role', 'student')
            ->assertJsonStructure(['token']);
        $this->assertDatabaseHas('users', [
            'email' => 'etudiant@example.com',
            'role' => 'student',
        ]);
    }

    public function test_registration_rejects_duplicate_email_and_mismatched_password(): void
    {
        User::factory()->create(['email' => 'existing@example.com']);

        $this->postJson('/api/register', [
            'name' => 'Étudiant',
            'email' => 'existing@example.com',
            'password' => 'password123',
            'password_confirmation' => 'different123',
        ])->assertStatus(422)
            ->assertJsonValidationErrors(['email', 'password']);
    }

    public function test_student_can_save_a_submission_draft_with_its_files(): void
    {
        Storage::fake('local');
        $student = User::factory()->create(['role' => 'student']);
        Sanctum::actingAs($student);

        $response = $this->post('/api/student/submission', [
            'title' => 'Application de gestion',
            'description' => 'Description du projet',
            'theme_file' => UploadedFile::fake()->create('theme.pdf', 100, 'application/pdf'),
            'thesis_file' => UploadedFile::fake()->create('memoire.pdf', 200, 'application/pdf'),
            'project_description_file' => UploadedFile::fake()->create('description.pdf', 100, 'application/pdf'),
        ]);

        $response->assertCreated()
            ->assertJsonPath('submission.status', 'draft')
            ->assertJsonCount(3, 'submission.files');
        $this->assertDatabaseHas('student_submissions', [
            'user_id' => $student->id,
            'title' => 'Application de gestion',
        ]);
    }

    public function test_student_cannot_submit_without_the_required_files(): void
    {
        $student = User::factory()->create(['role' => 'student']);
        Sanctum::actingAs($student);

        $this->post('/api/student/submission', [
            'title' => 'Application de gestion',
        ])->assertCreated();

        $this->post('/api/student/submission/submit')
            ->assertStatus(422)
            ->assertJsonPath('missing_files', [
                'theme_file',
                'thesis_file',
                'project_description_file',
            ]);
    }

    public function test_non_student_cannot_access_student_endpoints(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($admin);

        $this->get('/api/student/profile')->assertForbidden();
        $this->get('/api/student/submission')->assertForbidden();
    }

    public function test_student_can_register_a_push_token(): void
    {
        $student = User::factory()->create(['role' => 'student']);
        Sanctum::actingAs($student);

        $this->postJson('/api/student/push-token', [
            'token' => 'ExponentPushToken[test-token]',
            'platform' => 'expo',
        ])->assertOk();

        $this->assertDatabaseHas('student_device_tokens', [
            'user_id' => $student->id,
            'token' => 'ExponentPushToken[test-token]',
            'platform' => 'expo',
        ]);
    }
}