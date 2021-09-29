<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $input = $request->validated();

        $credentials = [
            'email' => $input['email'], 
            'password' => $input['password']
        ];

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => true, 'message' => 'Login não autorizado!']);
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }

    public function adminLogin(LoginRequest $request)
    {
        $input = $request->validated();

        $credentials = [
            'email' => $input['email'], 
            'password' => $input['password']
        ];

        if (!$token = auth('admin')->attempt($credentials)) {
            return response()->json(['error' => true, 'message' => 'Login não autorizado!']);
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('admin')->factory()->getTTL() * 60
        ]);
    }

    public function logout(Request $request)
    {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
