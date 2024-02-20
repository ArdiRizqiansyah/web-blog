<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            'Kesehatan', 'Pendidikan', 'Olahraga', 'Teknologi', 'Bisnis', 'Hiburan', 'Lainnya'
        ];

        // check if the table is empty
        if (Category::count() === 0){
            foreach ($data as $category) {
                Category::create([
                    'name' => $category
                ]);
            }
        }
    }
}
