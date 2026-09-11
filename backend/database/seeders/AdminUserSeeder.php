<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // 1. Compte 1 : Chef de Scolarité
        $user1 = User::updateOrCreate(
            ['email' => 'scolarite@emit.mg'],
            [
                'name' => 'Chef Scolarité EMIT',
                'password' => Hash::make('password123'),
            ]
        );
        $user1->assignRole('admin_scolarite');

        // 2. Compte 2 : Président de Mention
        $user2 = User::updateOrCreate(
            ['email' => 'president.ig@emit.mg'],
            [
                'name' => 'Président Mention IG',
                'password' => Hash::make('password123'),
            ]
        );
        $user2->assignRole('president_mention');

        // 3. Compte 3 : Utilisateur simple (sans rôle admin)
        User::updateOrCreate(
            ['email' => 'user@emit.mg'],
            [
                'name' => 'Utilisateur Test',
                'password' => Hash::make('password123'),
            ]
        );
    }
}
