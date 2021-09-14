<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function login(Request $request)
    {   
        dd($request);
        return response()->json(['success' => 'Login efetuado com sucesso']);
    }
}
