<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed', ['--class' => 'RoleSeeder']);
    }

    public function test_unauthenticated_user_cannot_access_dashboard_stats()
    {
        $response = $this->getJson('/api/v1/admin/dashboard/stats');

        $response->assertStatus(401);
    }

    public function test_non_admin_user_cannot_access_dashboard_stats()
    {
        $user = User::factory()->create();
        $user->assignRole('etudiant');
        $token = $user->createToken('test_token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/v1/admin/dashboard/stats');

        $response->assertStatus(403);
    }

    public function test_admin_can_access_dashboard_stats()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin_scolarite');
        $token = $admin->createToken('test_token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/v1/admin/dashboard/stats');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'total_etudiants',
                    'total_enseignants',
                    'total_salles',
                    'salles_disponibles',
                    'depots_stats' => [
                        'total',
                        'en_attente',
                        'valides',
                        'rejetes',
                    ],
                    'soutenances_stats' => [
                        'total',
                        'planifiees',
                        'en_cours',
                        'terminees',
                    ],
                ]
            ])
            ->assertJson([
                'success' => true,
                'message' => 'Statistiques du tableau de bord récupérées.',
            ]);
    }

    public function test_dashboard_stats_returns_correct_data_types()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin_scolarite');
        $token = $admin->createToken('test_token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/v1/admin/dashboard/stats');

        $data = $response->json('data');

        $this->assertIsInt($data['total_etudiants']);
        $this->assertIsInt($data['total_enseignants']);
        $this->assertIsInt($data['total_salles']);
        $this->assertIsInt($data['salles_disponibles']);
        $this->assertIsInt($data['depots_stats']['total']);
        $this->assertIsInt($data['depots_stats']['en_attente']);
        $this->assertIsInt($data['depots_stats']['valides']);
        $this->assertIsInt($data['depots_stats']['rejetes']);
        $this->assertIsInt($data['soutenances_stats']['total']);
        $this->assertIsInt($data['soutenances_stats']['planifiees']);
        $this->assertIsInt($data['soutenances_stats']['en_cours']);
        $this->assertIsInt($data['soutenances_stats']['terminees']);
    }

    public function test_dashboard_stats_returns_zero_for_empty_database()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin_scolarite');
        $token = $admin->createToken('test_token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/v1/admin/dashboard/stats');

        $data = $response->json('data');

        $this->assertEquals(0, $data['total_etudiants']);
        $this->assertEquals(0, $data['total_enseignants']);
        $this->assertEquals(0, $data['total_salles']);
        $this->assertEquals(0, $data['depots_stats']['total']);
        $this->assertEquals(0, $data['soutenances_stats']['total']);
    }
}
