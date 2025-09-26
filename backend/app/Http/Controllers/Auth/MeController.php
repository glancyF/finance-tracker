<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = $request->user()->fresh();
        return response()->json([
            'user' => $user->only('id','name','email','default_currency','role'),
        ]);
    }
}
