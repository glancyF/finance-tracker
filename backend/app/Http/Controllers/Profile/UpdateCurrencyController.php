<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UpdateCurrencyController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'currency' => ['required', 'string', 'size:3', Rule::in(config('currency.supported', []))],
        ]);

        $user->update([
            'default_currency' => strtoupper($request->input('currency')),
        ]);

        return response()->json([
            'user' => $user->fresh(),
        ]);
    }
}
