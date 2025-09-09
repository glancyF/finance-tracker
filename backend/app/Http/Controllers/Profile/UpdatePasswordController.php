<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;

use App\Http\Requests\Profile\UpdatePasswordRequest;
use Illuminate\Support\Facades\Hash;


class UpdatePasswordController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdatePasswordRequest $request)
    {
        $user = $request->user();
        $data = $request->validated();
        $user->update(['password' => Hash::make($data['password'])]);
        return response()->json(['message' => 'Password was successfully updated!']);
    }
}
