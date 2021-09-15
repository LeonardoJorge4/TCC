<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return Posts::paginate(9);
    }

    public function lastFivePosts()
    {
        return Posts::orderBy('created_at')->take(5)->get();
    }
}