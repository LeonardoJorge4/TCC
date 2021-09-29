<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Administrator;

class AdminController extends Controller
{
    public function login()
    {   
        return Auth::guard('admin')->user();
    }

    public function create(Request $request)
    {
        $admin = new Administrator;
        $admin->name = $request->name;
        $admin->email = $request->email;
        $admin->password = bcrypt($request->password);
        
        if($request->hasFile('image') && $request->file('image')->isValid()) {
            $requestImage = $request->image;

            $extension = $requestImage->extension();

            $imageName = md5($requestImage->getClientOriginalName() . strtotime("now")) . '.' . $extension;
            
            $requestImage->move('/home/leonardo/ignite-aulas/reactjs/dashgo/public/images/avatar', $imageName);

            $admin->image = $imageName;
        }

        $admin->save();

        return response()->json(['success' => 'Administrador criado com sucesso!']);
    }
}
