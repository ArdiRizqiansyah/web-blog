<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        // check if the table is empty
        if (Post::count() === 0) {
            $category_ids = Category::pluck('id')->toArray();

            for ($i = 0; $i < 10; $i++) {
                Post::create([
                    'category_id' => $category_ids[array_rand($category_ids)],
                    'title' => $faker->sentence,
                    'slug' => $faker->slug,
                    'content' => $faker->paragraph,
                ]);
            }
        }
    }
}
