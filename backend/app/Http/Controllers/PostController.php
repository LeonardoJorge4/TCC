<?php

namespace App\Http\Controllers;

use App\Http\Mail\MailSender;
use App\Models\Administrator;
use App\Models\Comments;
use App\Models\Posts;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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
        $comment = new Comments;
        $comment->user_id = $request->userId;
        $comment->post_id = $request->id;
        $comment->content = $request->comment;

        $comment->save();

        return response()->json(['success' => 'Comentário adicionado com sucesso!']);
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

        $emailUsers = User::where('receive_email', '=', 'true')->get('email');

        $details = [
            'title' => 'Nova postagem no blog!',
            'body' => 'teste email'
        ];

        try {
            foreach($emailUsers as $email){
                Mail::to($email)->send(new MailSender($details, $request->slug));
            }
        } catch (\Throwable $th) {
            return response()->json($th);
        }


        return response()->json(['success' => 'Postagem criado com sucesso!']);
    }

    public function delete(Request $request)
    {
        Posts::find($request->id)->delete();

        return response()->json(['success' => 'Postagem deletado com sucesso!']);
    }

    public function update(Request $request)
    {
        $post = Posts::find($request->id);
        $post->title = $request->title;
        $post->subtitle = $request->subtitle;
        $post->slug = $request->slug;
        $post->content = $request->content;

        if($request->hasFile('banner') && $request->file('banner')->isValid()) {
            $requestImage = $request->banner;

            $extension = $requestImage->extension();

            $imageName = md5($requestImage->getClientOriginalName() . strtotime("now")) . '.' . $extension;
            
            $requestImage->move('/home/leonardo/Projects/tecnoblog/frontend/public/images/posts', $imageName);

            $post->banner = $imageName;
        }

        $post->update();

        return response()->json(['success' => 'Postagem alterada com sucesso!']);
    }
    
}
