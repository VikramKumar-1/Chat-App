<?php

namespace App\Features\ChatAi\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
   /* public function search(Request $request)
    {
        $request->validate([
            'query' => 'required|string|min:1'
        ]);

        $users = User::where('username', 'ILIKE', '%' . $request->query . '%')
            ->where('id', '!=', Auth::id())
            ->select('id', 'name', 'username')
            ->limit(10)
            ->get();

        return response()->json($users);
    }*/
        public function search(Request $request)
   {
    $request->validate([
        'q' => 'required|string|min:1'
    ]);

    $users = User::where('username', 'ILIKE', '%' . $request->q . '%')
        ->where('id', '!=', Auth::id())
        ->select('id', 'name', 'username')
        ->limit(10)
        ->get();

    return response()->json($users);
   }
}