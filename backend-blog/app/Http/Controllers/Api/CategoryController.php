<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\ApiResource;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::filter()->latest()->paginate(5);
        return new ApiResource(true, 'Data kategori berhasil diambil', $categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->all());
        return new ApiResource(true, 'Data kategori berhasil ditambahkan', $category);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return new ApiResource(true, 'Data kategori berhasil diambil', $category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, Category $category)
    {
        $category->update($request->all());
        return new ApiResource(true, 'Data kategori berhasil diubah', $category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        // cek jika kategori memiliki posts
        if ($category->posts()->count() > 0) {
            return new ApiResource(false, 'Kategori tidak bisa dihapus karena memiliki produk', null);
        }

        $category->delete();

        return new ApiResource(true, 'Data kategori berhasil dihapus', null);
    }
}
