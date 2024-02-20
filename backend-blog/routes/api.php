<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\LogoutController;
use App\Http\Controllers\Api\PublicController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [LoginController::class, 'index'])->name('login');

// public
Route::get('/public', [PublicController::class, 'index']);
Route::get('/public/{slug}', [PublicController::class, 'show']);

Route::get('/post', [PostController::class, 'index']);
// end public

Route::middleware('auth:sanctum')->group( function () {
    Route::post('/logout', [LogoutController::class, 'index']);

    // admin
    Route::group(
        [
            'prefix' => 'admin',
            'middleware' => 'role:admin'
        ],
        function () {
            Route::get('/dashboard', [DashboardController::class, 'index']);

            Route::apiResource('category', CategoryController::class);
            Route::apiResource('post', PostController::class);
        }
    );
});