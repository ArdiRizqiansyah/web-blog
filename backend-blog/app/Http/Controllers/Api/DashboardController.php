<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index()
    {
        $totalPost = Post::count();
        $totalCategory = Category::count();

        return new ApiResource(true, 'Data dashboard berhasil diambil', [
            'total_post' => $totalPost,
            'total_category' => $totalCategory
        ]);
    }
}
