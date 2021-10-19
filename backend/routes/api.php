<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'users'
], function () {
    Route::get('/data', [UserController::class, 'dataResponse']);
    Route::post('/create', [UserController::class, 'create']);
    Route::post('/update', [UserController::class, 'update']);
    Route::get('/week', [UserController::class, 'getWeekUsers']);
});

Route::group([
    'prefix' => 'admin'
], function () {
    Route::get('/login', [AdminController::class, 'login']);
    Route::post('/create', [AdminController::class, 'create']);
});

Route::group([
    'prefix' => 'posts'
], function () {
    Route::get('/', [PostController::class, 'index']);
    Route::get('/all-posts', [PostController::class, 'allPosts']);
    Route::get('/last-five-posts', [PostController::class, 'lastFivePosts']);
    Route::get('/admin-name', [PostController::class, 'adminName']);
    Route::get('/{slug}', [PostController::class, 'getPost']);
    Route::post('/comment', [PostController::class, 'comment']);
    Route::post('/create', [PostController::class, 'create']);
    Route::post('/delete', [PostController::class, 'delete']);
    Route::post('/update', [PostController::class, 'update']);
    Route::post('/get-admin-id', [PostController::class, 'getAdminId']);
});

Route::group([
    'prefix' => 'comments'
], function () {
    Route::post('/quantity', [CommentController::class, 'quantity']);
    Route::post('/content', [CommentController::class, 'getContent']);
});

Route::group([
    'middleware' => 'apiJwt'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('admin-login', [AuthController::class, 'adminLogin']);
    Route::post('logout', [AuthController::class, 'logout']);
});



