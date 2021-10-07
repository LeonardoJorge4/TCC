<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
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
  'prefix' => 'admin'
], function () {
  Route::get('/login', [AdminController::class, 'login']);
  Route::post('/create', [AdminController::class, 'create']);
  Route::post('/get-admin-name', [AdminController::class, 'getNameAdmin']);
});

Route::group([
  'prefix' => 'auth'
], function () {
  Route::post('/login', [AuthController::class, 'login']);
  Route::get('/data', [AuthController::class, 'me']);
  Route::get('/refresh', [AuthController::class, 'refresh']);
  //Route::post('/logout', [AuthController::class, 'logout']);
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
});