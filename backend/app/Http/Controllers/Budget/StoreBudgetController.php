<?php

namespace App\Http\Controllers\Budget;

use App\Http\Controllers\Controller;
use App\Http\Requests\Budget\StoreBudgetRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;


class StoreBudgetController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreBudgetRequest $request)
    {
        $user = $request->user();
        $limit = 9;
        return DB::transaction(function () use ($request, $user, $limit) {
            DB::table('users')->where('id', $user->id)->lockForUpdate()->first();
            $count = $user->budgets()->count();
            if($count >= $limit) {
                throw ValidationException::withMessages([
                    'limit' => "You can't add more than $limit budgets."
                ]);
            }

            $budget=$user->budgets()->create($request->validated());
            return response()->json([
                'data' => [
                    'id' => (int)$budget->id,
                    'name' => $budget->name,
                    'amount' => (float)$budget->amount,
                    'currency' => $budget->currency,
                ]
            ],201);
        });
    }
}
