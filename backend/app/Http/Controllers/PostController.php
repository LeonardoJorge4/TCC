<?php

namespace App\Http\Controllers;

use App\Models\Administrator;
use App\Models\Posts;
use Illuminate\Http\Request;
use stdClass;

class PostController extends Controller
{
    public function index()
    {
        return Posts::paginate(9);
    }

    public function lastFivePosts()
    {
        $lastFivePosts = Posts::orderBy('created_at')->take(5)->get();

        return response()->json($lastFivePosts);
    }
    public function adminName()
    {
        $posts = Posts::orderBy('created_at')->take(5)->get('admin_id');
        $adminName = '';

        foreach ($posts as $key => $post) {
            $adminName .= Administrator::where('id', '=', $post->admin_id)->get('name');
        }

        return response()->json(json_encode($adminName));
    }
}
