<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\Auth;
class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(LoginRequest $request)
    {
        $cred = $request->validated();
        if(!Auth::attempt($cred,true)){
            return response()->json(['message'=>'Invalid credentials'],401);
        }
        $request->session()->regenerate();
        $user = $request->user();
        return response()->json(['user'=> $user->only('id','name','email','role')],200);
    }
}
