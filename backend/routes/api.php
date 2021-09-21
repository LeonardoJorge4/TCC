<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
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
    Route::get('/', [UserController::class, 'index']);
    Route::get('/data', [UserController::class, 'dataResponse']);
    Route::post('/', [UserController::class, 'create']);
    Route::put('/', [UserController::class, 'update']);
});

Route::group([
    'prefix' => 'posts'
], function () {
    Route::get('/', [PostController::class, 'index']);
    Route::get('/last-five-posts', [PostController::class, 'lastFivePosts']);
    Route::get('/admin-name', [PostController::class, 'adminName']);
});

Route::post('/admin/login', [AdminController::class, 'login']);

Route::group([
    'middleware' => 'apiJwt'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
});



