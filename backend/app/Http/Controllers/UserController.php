<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
        $user->image = $request->image;
        $user->password = $request->password;
        return response()->json(['success' => 'Usuário criado com sucesso!']);
    }

    public function update(Request $request)
    {

    }

    public function dataResponse(Request $request) {
        return Auth::user();
    }
}
