<?php

namespace App\Http\Controllers;

use App\Models\Administrator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function login()
    {   
        return Auth::user();
    }

    public function create(Request $request)
    {
        $admin = new Administrator;
        $admin->name = $request->name;
        $admin->email = $request->email;
        $admin->role = $request->role;
        $admin->password = bcrypt($request->password);
        
        if($request->hasFile('image') && $request->file('image')->isValid()) {
            $requestImage = $request->image;

            $extension = $requestImage->extension();

            $imageName = md5($requestImage->getClientOriginalName() . strtotime("now")) . '.' . $extension;
            
            $requestImage->move('/home/leonardo/Projects/tecnoblog/admin/public/images/avatar', $imageName);

            $admin->image = $imageName;
        }

        $admin->save();

        return response()->json(['success' => 'Administrador criado com sucesso!']);
    }

    public function getNameAdmin(Request $request)
    {
        if(is_array($request->id)) {
            $data = [];
            foreach($request->id as $key => $id) {
                $data[$key] = Administrator::where("id", '=', $id)->get('name');
            }

            $dataReturn = [];

            foreach($data as $key => $name) {
                foreach($name as $key => $item) {
                    $dataReturn[] = $item;
                }
            }

            return response()->json($dataReturn);
        }

        return Administrator::where("id", '=', $request->id)->get('name');
    }
}
