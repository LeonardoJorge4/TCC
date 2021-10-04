<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function create(Request $request)
    {
        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->receive_email = $request->receiveEmailPosts;
        $user->email_verified_at = now();
        $user->remember_token = Str::random(10);
        
        if($request->hasFile('image') && $request->file('image')->isValid()) {
            $requestImage = $request->image;

            $extension = $requestImage->extension();

            $imageName = md5($requestImage->getClientOriginalName() . strtotime("now")) . '.' . $extension;
            
            $requestImage->move('/home/leonardo/Projects/tecnoblog/frontend/public/images/avatar', $imageName);

            $user->image = $imageName;
        }

        $user->save();

        return response()->json(['success' => 'Usuário criado com sucesso!']);
    }

    public function update(Request $request)
    {
        $user = User::find($request->id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->receive_email = $request->receiveEmailPosts;
        
        if($request->hasFile('image') && $request->file('image')->isValid()) {
            File::delete('/home/leonardo/Projects/tecnoblog/frontend/public/images/avatar/' . $user->image);

            $requestImage = $request->image;

            $extension = $requestImage->extension();

            $imageName = md5($requestImage->getClientOriginalName() . strtotime("now")) . '.' . $extension;
            
            $requestImage->move('/home/leonardo/Projects/tecnoblog/frontend/public/images/avatar', $imageName);

            $user->image = $imageName;
        }

        $user->update();

        return response()->json(['success' => 'Usuário atualizado com sucesso!']);
    }

    public function dataResponse(Request $request) {
        return Auth::user();
    }
}
