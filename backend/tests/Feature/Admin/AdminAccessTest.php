<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdminAccessTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Exécuter le seeder de rôles pour créer les rôles nécessaires
        $this->seed(RoleSeeder::class);
        // Nettoyer la base de données avant chaque test
        User::query()->delete();
    }

    public function test_acces_refuse_401_pour_utilisateur_non_connecte_sur_endpoint_admin()
    {
        $this->getJson('/api/v1/admin/rooms')
            ->assertStatus(401)
            ->assertJson([
                'success' => false,
                'message' => 'Non authentifié. Jeton d\'accès invalide ou absent.',
            ]);
    }

    public function test_acces_refuse_403_pour_utilisateur_sans_role_admin_scolarite()
    {
        // Créer un utilisateur avec un rôle différent (étudiant)
        $user = User::factory()->create([
            'email' => 'etudiant@test.com',
            'password' => Hash::make('password123'),
            'status' => 'actif',
        ]);
        $user->assignRole('etudiant');

        // Générer un token Sanctum
        $token = $user->createToken('test-token')->plainTextToken;

        $this->withToken($token)
            ->getJson('/api/v1/admin/rooms')
            ->assertStatus(403)
            ->assertJson([
                'success' => false,
                'message' => 'Accès refusé. Vous n\'avez pas les permissions requises.',
            ]);
    }

    public function test_acces_autorise_200_pour_utilisateur_avec_role_admin_scolarite()
    {
        // Créer un utilisateur admin
        $admin = User::factory()->create([
            'email' => 'admin@test.com',
            'password' => Hash::make('password123'),
            'status' => 'actif',
        ]);
        $admin->assignRole('admin_scolarite');

        // Générer un token Sanctum
        $token = $admin->createToken('test-token')->plainTextToken;

        $this->withToken($token)
            ->getJson('/api/v1/admin/rooms')
            ->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Liste des salles récupérée avec succès.',
            ]);
    }

    public function test_creation_dune_salle_avec_admin_scolarite()
    {
        // Créer un utilisateur admin
        $admin = User::factory()->create([
            'email' => 'admin@test.com',
            'password' => Hash::make('password123'),
            'status' => 'actif',
        ]);
        $admin->assignRole('admin_scolarite');

        // Générer un token Sanctum
        $token = $admin->createToken('test-token')->plainTextToken;

        $roomData = [
            'name' => 'Salle A101',
            'capacity' => 30,
            'is_active' => true,
        ];

        $this->withToken($token)
            ->postJson('/api/v1/admin/rooms', $roomData)
            ->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Salle créée avec succès.',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'id',
                    'name',
                    'capacity',
                    'is_active',
                    'created_at',
                    'updated_at',
                ],
            ]);
    }

    public function test_recuperation_de_la_liste_des_salles_avec_admin_scolarite()
    {
        // Créer un utilisateur admin
        $admin = User::factory()->create([
            'email' => 'admin@test.com',
            'password' => Hash::make('password123'),
            'status' => 'actif',
        ]);
        $admin->assignRole('admin_scolarite');

        // Générer un token Sanctum
        $token = $admin->createToken('test-token')->plainTextToken;

        $this->withToken($token)
            ->getJson('/api/v1/admin/rooms')
            ->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Liste des salles récupérée avec succès.',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data',
            ]);
    }

    public function test_suppression_dune_salle_avec_admin_scolarite()
    {
        // Créer un utilisateur admin
        $admin = User::factory()->create([
            'email' => 'admin@test.com',
            'password' => Hash::make('password123'),
            'status' => 'actif',
        ]);
        $admin->assignRole('admin_scolarite');

        // Générer un token Sanctum
        $token = $admin->createToken('test-token')->plainTextToken;

        // Créer une salle d'abord
        $roomData = [
            'name' => 'Salle A101',
            'capacity' => 30,
            'is_active' => true,
        ];

        $createResponse = $this->withToken($token)
            ->postJson('/api/v1/admin/rooms', $roomData);
        $roomId = $createResponse->json('data.id');

        // Supprimer la salle
        $this->withToken($token)
            ->deleteJson("/api/v1/admin/rooms/$roomId")
            ->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Salle supprimée avec succès.',
            ]);
    }

    public function test_acces_refuse_401_pour_creation_de_salle_sans_authentification()
    {
        $roomData = [
            'name' => 'Salle A101',
            'capacity' => 30,
            'is_active' => true,
        ];

        $this->postJson('/api/v1/admin/rooms', $roomData)
            ->assertStatus(401)
            ->assertJson([
                'success' => false,
                'message' => 'Non authentifié. Jeton d\'accès invalide ou absent.',
            ]);
    }

    public function test_acces_refuse_403_pour_suppression_de_salle_par_etudiant()
    {
        // Créer un admin pour créer la salle
        $admin = User::factory()->create([
            'email' => 'admin@test.com',
            'password' => Hash::make('password123'),
            'status' => 'actif',
        ]);
        $admin->assignRole('admin_scolarite');

        // Créer une salle avec l'admin
        $this->actingAs($admin);
        $roomData = [
            'name' => 'Salle A101',
            'capacity' => 30,
            'is_active' => true,
        ];
        $createResponse = $this->postJson('/api/v1/admin/rooms', $roomData);
        $roomId = $createResponse->json('data.id');

        // Créer un utilisateur étudiant
        $etudiant = User::factory()->create([
            'email' => 'etudiant@test.com',
            'password' => Hash::make('password123'),
            'status' => 'actif',
        ]);
        $etudiant->assignRole('etudiant');

        // Essayer de supprimer avec l'étudiant
        $this->actingAs($etudiant);
        $this->deleteJson("/api/v1/admin/rooms/$roomId")
            ->assertStatus(403)
            ->assertJson([
                'success' => false,
                'message' => 'Accès refusé. Vous n\'avez pas les permissions requises.',
            ]);
    }
}
