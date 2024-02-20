<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Post;

class PublicController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        $new_post = Post::with('category')->latest()->first();
        $posts = Post::with('category')->where('id', '!=', $new_post->id)->latest()->get();

        return response()->json([
            'categories' => $categories,
            'new_post' => $new_post,
            'posts' => $posts
        ]);
    }

    public function show($slug)
    {
        $post = Post::with(['category', 'media'])->where('slug', $slug)->first();

        return response()->json($post);
    }
}
