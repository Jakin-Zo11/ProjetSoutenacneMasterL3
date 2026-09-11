<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RoleSeeder extends Seeder
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

        // Create permissions
        Permission::findOrCreate('manage_formations', 'api');
        Permission::findOrCreate('manage_rooms', 'api');
        Permission::findOrCreate('validate_jurys', 'api');

        // Create roles and assign created permissions
        $roleAdminScolarite = Role::findOrCreate('admin_scolarite', 'api');
        $roleAdminScolarite->givePermissionTo(['manage_formations', 'manage_rooms']);

        $rolePresidentMention = Role::findOrCreate('president_mention', 'api');
        $rolePresidentMention->givePermissionTo(['validate_jurys']);

        Role::findOrCreate('jury', 'api');
        Role::findOrCreate('etudiant', 'api');
        Role::findOrCreate('enseignant', 'api');
        Role::findOrCreate('president_jury', 'api');
        Role::findOrCreate('rapporteur', 'api');
        Role::findOrCreate('examinateur', 'api');

        // Assign admin_scolarite role to user 'scolarite@emit.mg' if exists
        $user1 = User::where('email', 'scolarite@emit.mg')->first();
        if ($user1) {
            $user1->assignRole($roleAdminScolarite);
        }

        // Assign president_mention role to user 'president.ig@emit.mg' if exists
        $user2 = User::where('email', 'president.ig@emit.mg')->first();
        if ($user2) {
            $user2->assignRole($rolePresidentMention);
        }
    }
}