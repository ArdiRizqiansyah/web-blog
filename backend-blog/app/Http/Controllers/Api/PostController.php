<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Http\Resources\ApiResource;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with(['category', 'media'])->filter()->latest()->paginate(5);
        $categories = Category::get();

        $data = [
            'posts' => $posts,
            'categories' => $categories
        ];

        return new ApiResource(true, 'Data post berhasil diambil', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request)
    {
        $request->validated([
            'title' => 'required',
            'content' => 'required',
            'category_id' => 'required|exists:categories,id',
            'cover' => 'image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $request['slug'] = Str::slug($request->title);

        $post = Post::create($request->all());

        if ($request->hasFile('cover')) {
            $post->addMediaFromRequest('cover')->toMediaCollection('cover');
        }

        return new ApiResource(true, 'Data post berhasil ditambahkan', $post->load('category'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post->load(['category', 'media']);

        return new ApiResource(true, 'Data post berhasil diambil', $post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        // $request->validated([
        //     'title' => 'required',
        //     'content' => 'required',
        //     'category_id' => 'required|exists:categories,id',
        //     'cover' => 'image|mimes:jpg,jpeg,png|max:2048'
        // ]);

        $post->update($request->all());

        if ($request->hasFile('cover')) {
            $post->clearMediaCollection('cover');

            $post->addMediaFromRequest('cover')->toMediaCollection('cover');
        }

        return new ApiResource(true, 'Data post berhasil diubah', $post->load('category'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->clearMediaCollection('cover');

        $post->delete();

        return new ApiResource(true, 'Data post berhasil dihapus', null);
    }
}
