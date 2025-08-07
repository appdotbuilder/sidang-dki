<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'admin',
                'display_name' => 'Administrator',
                'description' => 'Dapat melakukan manajemen pengguna, konfigurasi sistem, dan melihat laporan'
            ],
            [
                'name' => 'commissioner',
                'display_name' => 'Komisioner',
                'description' => 'Dapat melihat daftar kasus, mencatat hasil sidang, dan mengesahkan putusan'
            ],
            [
                'name' => 'clerk',
                'display_name' => 'Panitera',
                'description' => 'Dapat mengatur jadwal sidang, mengelola dokumen kasus, dan memverifikasi permohonan'
            ],
            [
                'name' => 'petitioner',
                'display_name' => 'Pemohon',
                'description' => 'Dapat mengajukan sengketa baru, melacak status permohonan, dan mengunggah dokumen'
            ],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role['name']], $role);
        }
    }
}