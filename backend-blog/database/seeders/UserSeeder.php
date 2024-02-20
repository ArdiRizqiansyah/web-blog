<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dataAdmin = [
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => 'admin',
            'email_verified_at' => now(),
        ];

        $dataUser = [
            'name' => 'User',
            'email' => 'user@gmail.com',
            'password' => '12345678',
            'email_verified_at' => now(),
        ];

        if (User::count() === 0) {
            $admin = User::create($dataAdmin);

            $admin->assignRole('admin');

            $user = User::create($dataUser);

            $user->assignRole('user');
        }
    }
}
