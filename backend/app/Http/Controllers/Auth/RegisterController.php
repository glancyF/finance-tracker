<?php

namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(RegisterRequest $request)
    {
        $d = $request->validated();
        $user = User::create([
            'name' => $d['name'],
            'email' => $d['email'],
            'password' => Hash::make($d['password']),
            'role' => 'user',
        ]);
        Auth::login($user);
        $request->session()->regenerate();
        return response()->json([
            'user'=>$user->only('id','name','email','role')
        ],201);
    }
}
