<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class StudentRegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_student_registration_is_pending_until_admin_validation(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Nouvel étudiant',
            'email' => 'etudiant@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'matricule' => '001I22',
            'mention' => 'informatique',
            'parcours' => 'professionnel',
            'admission_year' => 2022,
        ]);

        $response->assertCreated()
            ->assertJsonPath('student_status', 'pending')
            ->assertJsonPath('user.matricule', '001I22')
            ->assertJsonMissing(['token']);

        $this->assertDatabaseHas('users', [
            'email' => 'etudiant@example.com',
            'student_status' => 'pending',
        ]);
    }

    public function test_informatique_matricule_must_match_mention_and_admission_year(): void
    {
        $this->postJson('/api/register', [
            'name' => 'Étudiant',
            'email' => 'bad@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'matricule' => '001G22',
            'mention' => 'informatique',
            'parcours' => 'professionnel',
            'admission_year' => 2022,
        ])->assertStatus(422)
            ->assertJsonValidationErrors(['matricule']);

        $this->postJson('/api/register', [
            'name' => 'Étudiant',
            'email' => 'bad2@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'matricule' => '001I23',
            'mention' => 'informatique',
            'parcours' => 'professionnel',
            'admission_year' => 2022,
        ])->assertStatus(422)
            ->assertJsonValidationErrors(['matricule']);
    }

    public function test_pending_student_cannot_login_or_access_student_space(): void
    {
        $student = User::factory()->create([
            'email' => 'pending@example.com',
            'student_status' => 'pending',
            'matricule' => '002I22',
        ]);

        $this->postJson('/api/login', [
            'email' => 'pending@example.com',
            'password' => 'password',
        ])->assertForbidden()
            ->assertJsonPath('student_status', 'pending');

        Sanctum::actingAs($student);
        $this->get('/api/student/profile')->assertForbidden();
    }

    public function test_admin_can_approve_pending_student(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $student = User::factory()->create([
            'student_status' => 'pending',
            'matricule' => '003I22',
        ]);

        Sanctum::actingAs($admin);
        $this->postJson("/api/admin/students/{$student->id}/approve")
            ->assertOk()
            ->assertJsonPath('user.student_status', 'approved');

        $this->assertDatabaseHas('users', [
            'id' => $student->id,
            'student_status' => 'approved',
        ]);
        $this->assertDatabaseHas('student_notifications', [
            'user_id' => $student->id,
            'title' => 'Compte validé',
        ]);
    }

    public function test_approved_student_can_login_and_access_profile(): void
    {
        $student = User::factory()->create([
            'email' => 'approved@example.com',
            'student_status' => 'approved',
            'matricule' => '004I22',
        ]);

        $this->postJson('/api/login', [
            'email' => 'approved@example.com',
            'password' => 'password',
        ])->assertOk()
            ->assertJsonStructure(['token']);

        Sanctum::actingAs($student);
        $this->get('/api/student/profile')->assertOk();
    }
}
