<?php

namespace App\Http\Controllers;

use App\Models\Administrator;
use App\Models\Posts;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return Posts::orderBy('id', 'DESC')->paginate(9);
    }

    public function allPosts()
    {
        return Posts::orderBy('id', 'DESC')->get();
    }

    public function lastFivePosts()
    {
        return Posts::orderBy('id', 'DESC')->take(5)->get();
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
    public function getPost($slug)
    {
        $post = Posts::where('slug', '=', $slug)->get();
        return response()->json($post);
    }

    public function comment(Request $request)
    {
        dd($request);
    }

    public function create(Request $request)
    {
        $post = new Posts;
        $post->title = $request->title;
        $post->subtitle = $request->subtitle;
        $post->slug = $request->slug;
        $post->content = $request->content;
        $post->admin_id = 1;
        
        if($request->hasFile('banner') && $request->file('banner')->isValid()) {
            $requestImage = $request->banner;

            $extension = $requestImage->extension();

            $imageName = md5($requestImage->getClientOriginalName() . strtotime("now")) . '.' . $extension;
            
            $requestImage->move('/home/leonardo/Projects/tecnoblog/frontend/public/images/posts', $imageName);

            $post->banner = $imageName;
        }

        $post->save();

        return response()->json(['success' => 'Postagem criado com sucesso!']);
    }
}
