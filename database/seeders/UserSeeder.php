<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@ki-dki.go.id'],
            [
                'name' => 'Administrator',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $adminRole = Role::where('name', 'admin')->first();
        $admin->roles()->syncWithoutDetaching([$adminRole->id]);

        // Create commissioner user
        $commissioner = User::firstOrCreate(
            ['email' => 'komisioner@ki-dki.go.id'],
            [
                'name' => 'Komisioner Utama',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $commissionerRole = Role::where('name', 'commissioner')->first();
        $commissioner->roles()->syncWithoutDetaching([$commissionerRole->id]);

        // Create clerk user
        $clerk = User::firstOrCreate(
            ['email' => 'panitera@ki-dki.go.id'],
            [
                'name' => 'Panitera',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $clerkRole = Role::where('name', 'clerk')->first();
        $clerk->roles()->syncWithoutDetaching([$clerkRole->id]);

        // Create petitioner user
        $petitioner = User::firstOrCreate(
            ['email' => 'pemohon@example.com'],
            [
                'name' => 'Pemohon Contoh',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $petitionerRole = Role::where('name', 'petitioner')->first();
        $petitioner->roles()->syncWithoutDetaching([$petitionerRole->id]);
    }
}