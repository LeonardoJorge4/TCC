<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use App\Models\User;
use Illuminate\Http\Request;
use stdClass;

class CommentController extends Controller
{
    //retorna a quantidade de comentarios para cada post
    public function quantity(Request $request)
    {
        return Comments::where('post_id', '=', $request->id)->count();
    }

    public function getContent(Request $request)
    {
        $data = [];
        $comment = Comments::where('post_id', '=', $request->id)->get();
        $userId = Comments::where('post_id', '=', $request->id)->get('user_id');

        foreach ($userId as $key => $id) {
           $data[$key] = User::where('id', '=', $id->user_id)->get();
        }

        $dataReturn = [];

        foreach($data as $key => $user) {
            foreach($user as $key => $us) {
                $dataReturn[] = $us;
            }
        }

        return response()->json([
            'users' => $dataReturn,
            'comment' => $comment,
        ]);
    }
}
